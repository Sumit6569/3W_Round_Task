// src/App.jsx
import { useEffect, useState } from "react";
import { io } from "socket.io-client";
import { api } from "./api";
import UserSelect from "./components/UserSelect";
import AddUser from "./components/AddUser";
import Leaderboard from "./components/Leaderboard";
import toast from "react-hot-toast";
const socket = io("http://localhost:4000");

function App() {
  const [selected, setSelected] = useState("");
  const [board, setBoard] = useState([]);
  const [lastAward, setLastAward] = useState(null);

  // live board
  useEffect(() => {
    socket.on("leaderboard", setBoard);
    return () => socket.off("leaderboard");
  }, []);

  const claim = async () => {
    if (!selected) return alert("Choose a user first!");
    const res = await api.post("/claim", { userId: selected });
    setLastAward({
      name: res.data.user.name,
      pts: res.data.pointsAwarded,
    });
    toast.success(
      `💰  ${res.data.user.name} got ${res.data.pointsAwarded} points!`
    );
  };

  return (
    <div style={{ padding: 24 }}>
      <h2>Leaderboard Demo</h2>

      <UserSelect selected={selected} onChange={setSelected} />
      <button
        onClick={claim}
        className="ml-2 rounded-lg bg-amber-500 px-4 py-2 text-sm font-semibold text-white hover:bg-amber-600 active:scale-95"
      >
        Claim
      </button>

      <AddUser />

      {lastAward && (
        <p>
          🎉 {lastAward.name} got <b>{lastAward.pts}</b> points!
        </p>
      )}

      <Leaderboard board={board} />
    </div>
  );
}

export default App;
