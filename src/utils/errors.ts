export class APIError extends Error {
  constructor(message: string, extra?: Record<string, any>) {
    super(message);
    this.name = 'APIError';
    if (extra) {
      // Attach extra context for debugging/logging if needed
      (this as any).extra = JSON.stringify(extra);
    }
  }
}

export class FrontendError extends Error {
  constructor(message: string, extra?: Record<string, any>) {
    super(message);
    this.name = 'FrontendError';
    if (extra) {
      // Attach extra context for debugging/logging if needed
      (this as any).extra = JSON.stringify(extra);
    }
  }
}