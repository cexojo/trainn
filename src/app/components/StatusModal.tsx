import React from "react";

const StatusModal = ({
  open,
  icon,
  message,
  color = "blue"
}: {
  open: boolean;
  icon: React.ReactNode;
  message: React.ReactNode;
  color?: string;
}) => {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-[999] flex items-center justify-center bg-black/40">
      <div className="bg-white dark:bg-zinc-900 border-2 border-zinc-200 dark:border-zinc-700 rounded-lg shadow-lg p-8 flex flex-col items-center gap-4 min-w-[230px]">
        <div className={`text-5xl ${color === "green" ? "text-green-500" : "text-blue-500"}`}>{icon}</div>
        <div className="text-lg font-semibold text-center text-zinc-700 dark:text-white">{message}</div>
      </div>
    </div>
  );
};

export default StatusModal;
