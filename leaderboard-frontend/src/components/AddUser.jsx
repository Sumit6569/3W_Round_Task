import { useState } from "react";
import { api } from "../api";
import { toast } from "react-hot-toast";

export default function AddUser() {
  const [name, setName] = useState("");

  const add = async () => {
    if (!name.trim()) return;
    await api.post("/users", { name });
    toast.success(`🎉  ${name} added!`);
    setName("");
  };
  return (
    <div className="mt-6 flex max-w-md items-center gap-2">
      <input
        type="text"
        placeholder="New user name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="flex-1 rounded-lg border border-gray-300 px-3 py-2 text-sm outline-none focus:border-blue-400 focus:ring-1 focus:ring-blue-300"
      />
      <button
        onClick={add}
        className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 active:scale-95 disabled:cursor-not-allowed disabled:opacity-50"
        disabled={!name.trim()}
      >
        Add
      </button>
    </div>
  );
}
