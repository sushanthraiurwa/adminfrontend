import React, { useState } from "react";
import api from "../api";

function AddTeam({ onTeamAdded }) {
  const [name, setName] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    await api.post("/teams", { name });
    setName("");
    onTeamAdded();
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Team Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
      />
      <button type="submit">Add Team</button>
    </form>
  );
}

export default AddTeam;
