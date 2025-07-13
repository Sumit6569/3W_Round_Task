import { useMemo } from "react";
import { Gift, Crown } from "lucide-react";

export default function Leaderboard({ board = [] }) {
  const { top3, rest } = useMemo(() => {
    const t3 = board.slice(0, 3);
    return { top3: t3, rest: board.slice(3) };
  }, [board]);

  const bgGradient = ["from-[#E0F2FF]", "from-[#FFF3CC]", "from-[#FEE2E2]"];
  const crownColors = ["text-yellow-500", "text-gray-400", "text-amber-600"]; // silver, gold, bronze

  return (
    <div className="min-h-screen w-full max-w-md mx-auto font-['Poppins'] bg-gradient-to-b from-amber-50 to-white pb-24 px-4">
      {/* Header */}
      <header className="flex items-center gap-3 py-4 text-lg font-semibold text-gray-800">
        <span className="text-2xl">🏆</span>
        <h1 className="text-xl">Wealth Ranking</h1>
        <span className="ml-auto text-sm font-medium text-yellow-500">
          Monthly
        </span>
      </header>

      {/* Podium */}
      <section className="flex items-end justify-center gap-3 mt-4">
        {top3.map((u, i) => {
          const order = [1, 0, 2][i]; // tallest in middle
          const heights = ["h-36", "h-48", "h-32"];
          return (
            <div
              key={u._id}
              className={`flex flex-col items-center justify-end ${heights[order]} w-24 rounded-2xl bg-gradient-to-t ${bgGradient[i]} to-white shadow-lg pb-2`}
            >
              <div className="relative">
                <img
                  src={
                    u.avatar ??
                    `https://api.dicebear.com/6.x/initials/svg?seed=${u.name}`
                  }
                  alt={u.name}
                  className="h-14 w-14 rounded-full border-4 border-white object-cover shadow-md"
                />
                <Crown
                  className={`absolute -top-4 left-1/2 -translate-x-1/2 w-6 h-6 ${crownColors[i]}`}
                  fill="currentColor"
                />
              </div>
              <p className="mt-2 text-sm font-semibold truncate max-w-[80%] text-center">
                {u.name}
              </p>
              <p className="text-xs font-bold text-yellow-700">
                {u.points} pts
              </p>
            </div>
          );
        })}
      </section>

      {/* Rest of Leaderboard */}
      <ul className="mt-6 divide-y rounded-xl bg-white shadow">
        {rest.map((u, i) => (
          <li
            key={u._id}
            className="flex items-center gap-4 px-4 py-3 first:rounded-t-xl last:rounded-b-xl"
          >
            <span className="w-6 text-center font-semibold text-gray-500">
              {i + 4}
            </span>
            <img
              src={
                u.avatar ??
                `https://api.dicebear.com/6.x/initials/svg?seed=${u.name}`
              }
              alt={u.name}
              className="h-9 w-9 rounded-full object-cover border-2 border-white shadow"
            />
            <span className="flex-1 truncate text-sm font-medium">
              {u.name}
            </span>
            <span className="flex items-center gap-1 text-sm font-semibold text-amber-600">
              {u.points}
              <Gift className="h-4 w-4" fill="currentColor" />
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
