import { useState, useEffect, useCallback, useMemo } from "react";
import { getBrews, createBrew, updateBrew, deleteBrew } from "./api";
import BrewForm from "./components/BrewForm";
import BrewCard from "./components/BrewCard";
import StatsBar from "./components/StatsBar";

const METHODS = ["All", "Pour Over", "French Press", "Espresso", "AeroPress", "Cold Brew", "Moka Pot"];

export default function App() {
  const [brews, setBrews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState("");
  const [filter, setFilter] = useState("All");
  const [sortOrder, setSortOrder] = useState("newest");
  const [editingBrew, setEditingBrew] = useState(null);

  const loadBrews = useCallback(async () => {
    setLoading(true);
    setLoadError("");
    try {
      const data = await getBrews(filter === "All" ? undefined : filter);
      setBrews(data);
    } catch (err) {
      setLoadError(err.message);
    } finally {
      setLoading(false);
    }
  }, [filter]);

  useEffect(() => {
    loadBrews();
  }, [loadBrews]);
  useEffect(() => {
    document.title =  `Brews: ${brews.length}`;
  }, [brews]);

  const sortedBrews = useMemo(() => {
    const copy = [...brews];
    copy.sort((a, b) =>
      sortOrder === "newest"
        ? new Date(b.createdAt) - new Date(a.createdAt)
        : new Date(a.createdAt) - new Date(b.createdAt)
    );
    return copy;
  }, [brews, sortOrder]);

  async function handleSubmit(data) {
    if (editingBrew) {
      await updateBrew(editingBrew.id, data);
      setEditingBrew(null);
    } else {
      await createBrew(data);
    }
    loadBrews();
  }

  async function handleDelete(id) {
    await deleteBrew(id);
    setBrews((prev) => prev.filter((b) => b.id !== id));
  }

  return (
    <div className="min-h-screen bg-[#1a110b] pb-16">
      <header className="bg-[#2B1B12] border-b border-black/30 px-6 py-8 sm:py-10">
        <div className="max-w-5xl mx-auto">
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-[#D4A24C] mb-2">
            No. 001 — Brewing Journal
          </p>
          <h1 className="font-serif text-4xl sm:text-5xl text-[#EDE3D0]">Brews: {brews.length}</h1>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-6 mt-8 space-y-8">
        <StatsBar brews={brews} />

        <BrewForm
          onSubmit={handleSubmit}
          editingBrew={editingBrew}
          onCancelEdit={() => setEditingBrew(null)}
        />

        <div className="flex items-center justify-between flex-wrap gap-3">
          <h2 className="font-serif text-2xl text-[#EDE3D0]">Ticket history</h2>
          <div className="flex gap-2">
            <select
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              className="bg-[#2B1B12] text-[#EDE3D0] text-sm rounded-lg px-3 py-2 border border-[#EDE3D0]/20 focus:outline-none focus:ring-2 focus:ring-[#D4A24C]"
            >
              {METHODS.map((m) => (
                <option key={m} value={m}>
                  {m}
                </option>
              ))}
            </select>
            <button
              onClick={() => setSortOrder((prev) => (prev === "newest" ? "oldest" : "newest"))}
              className="text-sm rounded-lg px-3 py-2 border border-[#EDE3D0]/20 text-[#EDE3D0] hover:bg-[#EDE3D0]/5 transition-colors font-mono"
            >
              {sortOrder === "newest" ? "Newest first" : "Oldest first"}
            </button>
          </div>
        </div>

        {loading && <p className="text-[#EDE3D0]/50 font-mono text-sm">Loading brews…</p>}

        {loadError && (
          <p className="text-[#D97757] bg-[#D97757]/10 border border-[#D97757]/30 rounded-lg px-4 py-3 text-sm">
            Couldn't reach the server: {loadError}. Make sure the backend is running on port 3000.
          </p>
        )}

        {!loading && !loadError && brews.length === 0 && (
          <p className="text-[#EDE3D0]/50 font-mono text-sm">
            No brews logged yet. Fill in the form above to start your journal.
          </p>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {sortedBrews.map((brew) => (
            <BrewCard key={brew.id} brew={brew} onEdit={setEditingBrew} onDelete={handleDelete} />
          ))}
        </div>
      </main>
    </div>
  );
}