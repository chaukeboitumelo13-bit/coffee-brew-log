import { useState, useEffect } from "react";

const METHODS = ["Pour Over", "French Press", "Espresso", "AeroPress", "Cold Brew", "Moka Pot"];

const emptyForm = {
  method: "Pour Over",
  coffeeAmount: "",
  waterAmount: "",
  brewTime: "",
  notes: "",
};

export default function BrewForm({ onSubmit, editingBrew, onCancelEdit }) {
  const [form, setForm] = useState(emptyForm);
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (editingBrew) {
      setForm({
        method: editingBrew.method,
        coffeeAmount: editingBrew.coffeeAmount,
        waterAmount: editingBrew.waterAmount,
        brewTime: editingBrew.brewTime,
        notes: editingBrew.notes || "",
      });
    } else {
      setForm(emptyForm);
    }
  }, [editingBrew]);

  const ratio =
    form.coffeeAmount > 0 && form.waterAmount > 0
      ? (form.waterAmount / form.coffeeAmount).toFixed(1)
      : null;

  function update(field, value) {
    setForm((prev) => ({ ...prev, [field]: value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");

    if (!form.method || !form.coffeeAmount || !form.waterAmount || !form.brewTime) {
      setError("Fill in method, coffee, water, and time before logging the brew.");
      return;
    }

    setSubmitting(true);
    try {
      await onSubmit({
        method: form.method,
        coffeeAmount: parseFloat(form.coffeeAmount),
        waterAmount: parseFloat(form.waterAmount),
        brewTime: parseInt(form.brewTime, 10),
        notes: form.notes || null,
      });
      if (!editingBrew) setForm(emptyForm);
    } catch (err) {
      setError(err.message);
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-[#2B1B12] rounded-2xl p-6 sm:p-8 shadow-xl border border-black/20"
    >
      <div className="flex items-center justify-between mb-6">
        <h2 className="font-serif text-2xl text-[#EDE3D0]">
          {editingBrew ? "Edit brew" : "Log a brew"}
        </h2>
        {ratio && (
          <span className="font-mono text-sm px-3 py-1 rounded-full bg-[#D4A24C] text-[#2B1B12] font-bold tracking-wide">
            1:{ratio}
          </span>
        )}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <label className="flex flex-col gap-1.5 sm:col-span-2">
          <span className="text-xs uppercase tracking-wider text-[#EDE3D0]/60">Method</span>
          <select
            value={form.method}
            onChange={(e) => update("method", e.target.value)}
            className="bg-[#EDE3D0] text-[#2B1B12] rounded-lg px-3 py-2.5 font-medium focus:outline-none focus:ring-2 focus:ring-[#D4A24C]"
          >
            {METHODS.map((m) => (
              <option key={m} value={m}>
                {m}
              </option>
            ))}
          </select>
        </label>

        <label className="flex flex-col gap-1.5">
          <span className="text-xs uppercase tracking-wider text-[#EDE3D0]/60">Coffee (g)</span>
          <input
            type="number"
            step="0.1"
            min="0"
            value={form.coffeeAmount}
            onChange={(e) => update("coffeeAmount", e.target.value)}
            className="bg-[#EDE3D0] text-[#2B1B12] rounded-lg px-3 py-2.5 font-mono focus:outline-none focus:ring-2 focus:ring-[#D4A24C]"
            placeholder="18"
          />
        </label>

        <label className="flex flex-col gap-1.5">
          <span className="text-xs uppercase tracking-wider text-[#EDE3D0]/60">Water (g)</span>
          <input
            type="number"
            step="0.1"
            min="0"
            value={form.waterAmount}
            onChange={(e) => update("waterAmount", e.target.value)}
            className="bg-[#EDE3D0] text-[#2B1B12] rounded-lg px-3 py-2.5 font-mono focus:outline-none focus:ring-2 focus:ring-[#D4A24C]"
            placeholder="300"
          />
        </label>

        <label className="flex flex-col gap-1.5 sm:col-span-2">
          <span className="text-xs uppercase tracking-wider text-[#EDE3D0]/60">
            Brew time (seconds)
          </span>
          <input
            type="number"
            min="0"
            value={form.brewTime}
            onChange={(e) => update("brewTime", e.target.value)}
            className="bg-[#EDE3D0] text-[#2B1B12] rounded-lg px-3 py-2.5 font-mono focus:outline-none focus:ring-2 focus:ring-[#D4A24C]"
            placeholder="180"
          />
        </label>

        <label className="flex flex-col gap-1.5 sm:col-span-2">
          <span className="text-xs uppercase tracking-wider text-[#EDE3D0]/60">
            Notes (optional)
          </span>
          <textarea
            value={form.notes}
            onChange={(e) => update("notes", e.target.value)}
            rows={2}
            className="bg-[#EDE3D0] text-[#2B1B12] rounded-lg px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-[#D4A24C] resize-none"
            placeholder="Tasted bright, slightly sour — grind coarser next time"
          />
        </label>
      </div>

      {error && (
        <p className="mt-4 text-sm text-[#D97757] bg-[#D97757]/10 border border-[#D97757]/30 rounded-lg px-3 py-2">
          {error}
        </p>
      )}

      <div className="flex gap-3 mt-6">
        <button
          type="submit"
          disabled={submitting}
          className="bg-[#8C4A2F] hover:bg-[#a3592f] text-[#EDE3D0] font-semibold rounded-lg px-5 py-2.5 transition-colors disabled:opacity-50"
        >
          {submitting ? "Saving…" : editingBrew ? "Save changes" : "Log brew"}
        </button>
        {editingBrew && (
          <button
            type="button"
            onClick={onCancelEdit}
            className="text-[#EDE3D0]/70 hover:text-[#EDE3D0] font-medium px-4 py-2.5 transition-colors"
          >
            Cancel
          </button>
        )}
      </div>
    </form>
  );
}