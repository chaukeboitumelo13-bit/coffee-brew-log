import { useState } from "react";

function formatTime(seconds) {
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return `${m}:${s.toString().padStart(2, "0")}`;
}

function formatDate(iso) {
  return new Date(iso).toLocaleDateString(undefined, {
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
  });
}

export default function BrewCard({ brew, onEdit, onDelete }) {
  const [confirmingDelete, setConfirmingDelete] = useState(false);
  const ratio = (brew.waterAmount / brew.coffeeAmount).toFixed(1);

  return (
    <div
      className="relative bg-[#EDE3D0] rounded-lg shadow-md overflow-hidden"
      style={{ animation: "ticket-in 0.35s ease-out" }}
    >
      {/* perforated edge */}
      <div className="absolute top-0 left-0 right-0 h-3 flex justify-between px-2">
        {Array.from({ length: 14 }).map((_, i) => (
          <span key={i} className="w-1.5 h-1.5 rounded-full bg-[#2B1B12]/10 -mt-0.5" />
        ))}
      </div>

      <div className="p-5 pt-6">
        <div className="flex items-start justify-between gap-3">
          <div>
            <h3 className="font-serif text-xl text-[#2B1B12] leading-tight">{brew.method}</h3>
            <p className="text-xs font-mono text-[#2B1B12]/50 mt-0.5">
              {formatDate(brew.createdAt)}
            </p>
          </div>
          <span className="shrink-0 font-mono text-xs px-2.5 py-1 rounded-full bg-[#D4A24C] text-[#2B1B12] font-bold border-2 border-[#2B1B12]/10 rotate-3">
            1:{ratio}
          </span>
        </div>

        <div className="mt-4 grid grid-cols-3 gap-2 font-mono text-sm text-[#2B1B12]">
          <div>
            <div className="text-[#2B1B12]/50 text-[10px] uppercase tracking-wider">Coffee</div>
            <div className="font-semibold">{brew.coffeeAmount}g</div>
          </div>
          <div>
            <div className="text-[#2B1B12]/50 text-[10px] uppercase tracking-wider">Water</div>
            <div className="font-semibold">{brew.waterAmount}g</div>
          </div>
          <div>
            <div className="text-[#2B1B12]/50 text-[10px] uppercase tracking-wider">Time</div>
            <div className="font-semibold">{formatTime(brew.brewTime)}</div>
          </div>
        </div>

        {brew.notes && (
          <p className="mt-3 text-sm text-[#2B1B12]/70 border-t border-dashed border-[#2B1B12]/15 pt-3">
            {brew.notes}
          </p>
        )}

        <div className="mt-4 pt-3 border-t border-dashed border-[#2B1B12]/15">
          {confirmingDelete ? (
            <div className="flex items-center gap-3">
              <span className="text-xs text-[#2B1B12]/70">Delete this ticket?</span>
              <button
                onClick={() => onDelete(brew.id)}
                className="text-xs font-semibold uppercase tracking-wide text-red-700 hover:text-red-900"
              >
                Yes, delete
              </button>
              <button
                onClick={() => setConfirmingDelete(false)}
                className="text-xs font-semibold uppercase tracking-wide text-[#2B1B12]/50 hover:text-[#2B1B12]"
              >
                Cancel
              </button>
            </div>
          ) : (
            <div className="flex gap-4">
              <button
                onClick={() => onEdit(brew)}
                className="text-xs font-semibold uppercase tracking-wide text-[#8C4A2F] hover:text-[#6b3820]"
              >
                Edit
              </button>
              <button
                onClick={() => setConfirmingDelete(true)}
                className="text-xs font-semibold uppercase tracking-wide text-[#2B1B12]/40 hover:text-red-700"
              >
                Delete
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}