import React, { useState } from "react";
import api from "../api";
import "./EditTeam.css"; // optional for styling

function EditTeam({ team, onUpdated }) {
  const [points, setPoints] = useState(team.points);

  const handleUpdate = async (e) => {
    e.preventDefault();
    await api.put(`/teams/${team._id}`, { points });
    onUpdated();
  };

  return (
    <div className="edit-form-wrapper">
      <form className="edit-form" onSubmit={handleUpdate}>
        <div className="form-group">
          <label>Team Name</label>
          <input
            type="text"
            value={team.name}
            readOnly
            className="readonly-input"
          />
        </div>
        <div className="form-group">
          <label>Update Points</label>
          <input
            type="number"
            value={points}
            onChange={(e) => {
              const val = e.target.value;
              if (val === "0") setPoints(0);
              else setPoints(Number(val));
            }}
            onFocus={(e) => {
              if (e.target.value === "0") e.target.select();
            }}
            required
            className="points-input"
          />
        </div>
        <button type="submit">Update Points</button>
      </form>
    </div>
  );
  
}

export default EditTeam;
