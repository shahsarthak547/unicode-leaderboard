import { useEffect, useState } from "react";
import bgImage from "./image.jpg";
export default function Leaderboard() {
  const [data, setData] = useState([]);
  const [search, setSearch] = useState("");
  const [lastUpdated, setLastUpdated] = useState(null);
  const spreadsheetId = "1pAc8AlCdPFduk1cblYitu9fz3eg8_05OfFsQg2GF48I";
  const apiUrl = `https://opensheet.elk.sh/${spreadsheetId}/Sheet1`;
  const fetchData = async () => {
    try {
      const res = await fetch(apiUrl);
      const json = await res.json();
      const sorted = json
        .map(entry => ({
          ...entry,
          Score: Number(entry.Score),
        }))
        .sort((a, b) => b.Score - a.Score);
      setData(sorted);
      setLastUpdated(new Date().toLocaleTimeString());
    } catch (err) {
      console.error("Error fetching data:", err);
    }
  };

  useEffect(() => {
    fetchData();
    const interval = setInterval(fetchData, 5000);
    return () => clearInterval(interval);
  }, []);

  if (!data.length)
    return (
      <div className="flex items-center justify-center h-screen bg-gradient-to-b from-indigo-100 via-white to-indigo-50">
        <div className="text-center text-gray-600 text-xl animate-pulse">
          Loading leaderboard...
        </div>
      </div>
    );

  const filteredRows = data.filter(row =>
    (row.Name ?? "").toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gradient-to-b from-indigo-100 via-white to-indigo-50 flex flex-col items-center px-4 py-10"
      style={{
        backgroundImage : `url(${bgImage})`,
        backgroundSize : "cover",
        backgroundPosition : "center",
      }}>
      <div className="sticky top-0 bg-white/80 backdrop-blur-sm w-full max-w-2xl rounded-xl shadow-md mb-8 p-4 flex flex-col sm:flex-row items-center justify-between">
        <div className="flex items-center gap-3">
          <span className="text-4xl">🏆</span>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-800">
            Leaderboard
          </h1>
        </div>
        {lastUpdated && (
          <div className="text-gray-500 text-sm sm:text-base mt-2 sm:mt-0">
            Last updated: <span className="font-semibold">{lastUpdated}</span>
          </div>
        )}
      </div>
      <div className="w-full max-w-2xl mb-8">
        <input
          type="text"
          placeholder="Search player..."
          className="w-full px-5 py-3 border border-gray-300 rounded-lg shadow-sm text-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all duration-200"
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
      </div>
      <div className="w-full max-w-2xl flex flex-col gap-4 bg-white shadow-xl rounded-xl p-6">
        <div className="flex font-semibold text-indigo-700 text-lg border-b pb-3 mb-3">
          <div className="flex-1">Player</div>
          <div className="w-24 text-right">Score</div>
        </div>

        {filteredRows.length === 0 && (
          <div className="py-8 text-center text-gray-400 text-lg">
            No matching player found.
          </div>
        )}

        {filteredRows.map((row, index) => {
          const medal =
            index === 0 ? "🥇"
              : index === 1 ? "🥈"
              : index === 2 ? "🥉"
              : "";

          const bgColor =
            index === 0 ? "bg-yellow-50"
              : index === 1 ? "bg-gray-100"
              : index === 2 ? "bg-orange-50"
              : "bg-gray-50";

          return (
            <div
              key={row.Name + row.Score}
              className={`flex items-center rounded-lg transition-transform duration-300 hover:scale-[1.03] px-5 py-4 ${bgColor}`}
            >
              <div className="flex-1 flex items-center gap-2 font-medium text-gray-900 text-lg">
                {medal && <span className="text-2xl">{medal}</span>}
                {row.Name}
              </div>
              <div className="w-24 text-right font-bold text-indigo-700 text-xl">
                {row.Score}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
