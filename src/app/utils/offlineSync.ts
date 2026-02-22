/**
 * offlineSync.ts
 * Utility for queuing, storing, and replaying PATCH requests that failed due to network errors.
 *
 * All queued patches are stored in localStorage under OFFLINE_PATCH_QUEUE_KEY.
 * Each item: { url: string, body: any, meta: { blockNumber, weekNumber, dayNumber, exerciseName, seriesNumber, field, value } }
 */

const OFFLINE_PATCH_QUEUE_KEY = "offline_patch_queue_v1";

export interface OfflinePatchMeta {
  blockNumber: string | number;
  weekNumber: string | number;
  dayNumber: string | number;
  exerciseName: string;
  seriesNumber: string | number;
  field: "effectiveReps" | "effectiveWeight" | "effectiveRir" | string;
  value: any;
}

export interface OfflinePatch {
  url: string;
  body: any;
  meta: OfflinePatchMeta;
}

/** Get the queue from localStorage */
export function getOfflinePatchQueue(): OfflinePatch[] {
  try {
    const raw = localStorage.getItem(OFFLINE_PATCH_QUEUE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

/** Add a new patch to the queue, replacing any previous for the same item (deduplicate on unique field) */
export function addOfflinePatch(patch: OfflinePatch) {
  const q = getOfflinePatchQueue();
  // Uniqueness by url + block/week/day/exName/series/field
  const idx = q.findIndex(
    (p) =>
      p.url === patch.url &&
      p.meta.blockNumber === patch.meta.blockNumber &&
      p.meta.weekNumber === patch.meta.weekNumber &&
      p.meta.dayNumber === patch.meta.dayNumber &&
      p.meta.exerciseName === patch.meta.exerciseName &&
      p.meta.seriesNumber === patch.meta.seriesNumber &&
      p.meta.field === patch.meta.field
  );
  if (idx >= 0) {
    q[idx] = patch; // Replace old with newer value
  } else {
    q.push(patch);
  }
  localStorage.setItem(OFFLINE_PATCH_QUEUE_KEY, JSON.stringify(q));
}

/** Remove patch at index from the queue */
export function removeOfflinePatch(index: number) {
  const q = getOfflinePatchQueue();
  q.splice(index, 1);
  localStorage.setItem(OFFLINE_PATCH_QUEUE_KEY, JSON.stringify(q));
}

/** Clear the entire queue (useful for debugging) */
export function clearOfflinePatchQueue() {
  localStorage.removeItem(OFFLINE_PATCH_QUEUE_KEY);
}

/**
 * Attempt to replay (synchronize) all patches sequentially.
 * Returns: { total: number, success: number, failed: number }
 * Pass a callback to be notified after each sync attempt (for progress bar UI).
 */
export async function synchronizeOfflinePatches(
  onProgress?: (idx: number, total: number, meta: OfflinePatchMeta, status: "success" | "network-error" | "server-error") => void
) {
  let queue = getOfflinePatchQueue();
  let successes = 0;
  let failures = 0;

  for (let i = 0; i < queue.length; ++i) {
    const { url, body, meta } = queue[i];
    try {
      const res = await fetch(url, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      if (res.ok) {
        successes++;
        // Remove this patch from the queue
        removeOfflinePatch(i);
        queue = getOfflinePatchQueue(); // Refresh because our queue changed length
        i--; // Next iteration remains at same index
        if (onProgress) onProgress(i + 1, queue.length + successes + failures, meta, "success");
        continue;
      } else {
        failures++;
        if (onProgress) onProgress(i + 1, queue.length + successes + failures, meta, "server-error");
        // leave in the queue, try again later
      }
    } catch {
      failures++;
      if (onProgress) onProgress(i + 1, queue.length + successes + failures, meta, "network-error");
      // leave in the queue
    }
  }

  return {
    total: queue.length + successes + failures,
    success: successes,
    failed: failures,
  };
}

/** Return the number of pending patches */
export function getOfflinePatchCount(): number {
  return getOfflinePatchQueue().length;
}
