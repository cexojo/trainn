"use client";
import { useState, useRef } from "react";

type User = { id: string; name: string; role: string; };

export default function AthleteAutocomplete({
  users,
  selectedUser,
  setSelectedUser,
}: {
  users: User[];
  selectedUser: User | null;
  setSelectedUser: (u: User | null) => void;
}) {
  const [search, setSearch] = useState("");
  const [open, setOpen] = useState(false);
  const [autoIndex, setAutoIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  const filtered = users.filter(
    u =>
      !search ||
      u.name.toLowerCase().includes(search.toLowerCase())
  ).slice(0, 20);

  return (
    <div style={{ position: "relative", width: "100%" }} className="mb-6">
      <input
        ref={inputRef}
        className="p-2 rounded border w-full"
        type="text"
        placeholder="Search athletes..."
        value={
          (search !== "" ? search : (selectedUser && (selectedUser.name || "")) || "")
        }
        onChange={e => {
          setSearch(e.target.value);
          setOpen(true);
          setAutoIndex(0);
        }}
        onFocus={() => setOpen(true)}
        onBlur={() => setTimeout(() => setOpen(false), 200)}
        autoComplete="off"
        spellCheck={false}
        onKeyDown={e => {
          if (!open) return;
          let maxIdx = filtered.length - 1;
          if (e.key === "ArrowDown") {
            e.preventDefault();
            setAutoIndex(i => Math.min(i + 1, maxIdx));
          } else if (e.key === "ArrowUp") {
            e.preventDefault();
            setAutoIndex(i => Math.max(i - 1, 0));
          } else if (e.key === "Enter") {
            if (filtered[autoIndex]) {
              setSelectedUser(filtered[autoIndex]);
              setSearch(filtered[autoIndex].name);
              setOpen(false);
              inputRef.current?.blur();
            }
          } else if (e.key === "Escape") {
            setOpen(false);
            inputRef.current?.blur();
          }
        }}
      />
      {open && filtered.length > 0 && (
        <div
          style={{
            position: "absolute",
            zIndex: 50,
            background: "white",
            border: "1px solid #ddd",
            width: "100%",
            maxHeight: 180,
            overflowY: "auto"
          }}
        >
          {filtered.map((u, idx) => (
            <div
              key={u.id}
              style={{
                padding: "6px 12px",
                cursor: "pointer",
                background:
                  autoIndex === idx
                    ? "#dbeafe"
                    : selectedUser?.id === u.id
                    ? "#e7f0fc"
                    : "white"
              }}
              onMouseDown={() => {
                setSelectedUser(u);
                setSearch(u.name);
                setOpen(false);
              }}
            >
              {u.name}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
