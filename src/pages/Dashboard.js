import React, { useEffect, useState } from "react";
import api from "../api";
import AddTeam from "../components/AddTeam";
import EditTeam from "../components/EditTeam";
import TeamList from "../components/TeamList";
import './Dashboard.css';  // Import the CSS file


function Dashboard() {
  const [teams, setTeams] = useState([]);
  const [editTeam, setEditTeam] = useState(null);

  const fetchTeams = async () => {
    const res = await api.get("/teams");
    setTeams(res.data);
  };

  useEffect(() => {
    fetchTeams();
  }, []);

  const handleDelete = async (id) => {
    await api.delete(`/teams/${id}`);
    fetchTeams();
  };

  const handleEdit = (team) => {
    setEditTeam(team);
  };

  const handleUpdate = () => {
    setEditTeam(null);
    fetchTeams();
  };

  return (
    <div>
      <h2>Admin Dashboard</h2>
      <AddTeam onTeamAdded={fetchTeams} />
      {editTeam && <EditTeam team={editTeam} onUpdated={handleUpdate} />}
      <TeamList teams={teams} onEdit={handleEdit} onDelete={handleDelete} />
    </div>
  );
}

export default Dashboard;
