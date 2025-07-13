import { useEffect, useState } from "react";
import { api } from "../api";

export default function UserSelect({ selected, onChange }) {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    api.get("/users").then((res) => setUsers(res.data));
  }, []);

  return (
    <select
      value={selected}
      onChange={(e) => onChange(e.target.value)}
      className="rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm focus:border-blue-400 focus:outline-none focus:ring-1 focus:ring-blue-300"
    >
      <option value="">— choose user —</option>
      {users.map((u) => (
        <option key={u._id} value={u._id}>
          {u.name}
        </option>
      ))}
    </select>
  );
}
