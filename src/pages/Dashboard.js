import React, { useEffect, useState } from "react";
import api from "../api";
import AddTeam from "../components/AddTeam";
import EditTeam from "../components/EditTeam";
import TeamList from "../components/TeamList";
import './Dashboard.css';  // Import the CSS file


import { startTimer, stopTimer, resetTimer, getSortedTeams } from "../api";


function Dashboard() {
  const [teams, setTeams] = useState([]);
  const [editTeam, setEditTeam] = useState(null);

  // Fetch all teams from the API
  const fetchTeams = async () => {
    try {
      const res = await getSortedTeams(); // use sorted list
      setTeams(res.data);
    } catch (err) {
      console.error("Failed to fetch teams:", err);
    }
  };

  // Start timer for all teams
  const handleStartTimer = async () => {
    try {
      await startTimer(); // Start timer for all teams
      alert("Timer started for all teams!");
      fetchTeams(); // Refetch teams to get updated data
    } catch (err) {
      alert("Failed to start the timer.");
      console.error("Error starting timer:", err);
    }
  };

  // Stop timer for a specific team
  const handleStopTimer = async (id) => {
    try {
      const res = await stopTimer(id); // Call stopTimer API
      if (res.data) {
        alert(`Timer stopped at ${res.data.totalTimeTaken}s`); // Show the time taken
        fetchTeams(); // Refetch teams to update with the new timeTaken
      }
    } catch (err) {
      alert("Failed to stop the timer.");
      console.error("Error stopping timer:", err);
    }
  };

  // Fetch teams on initial load
  useEffect(() => {
    fetchTeams();
  }, []);

  // Handle team deletion
  const handleDelete = async (id) => {
    try {
      await api.delete(`/teams/${id}`);
      fetchTeams(); // Refetch teams after deletion
    } catch (err) {
      alert("Failed to delete the team.");
      console.error("Error deleting team:", err);
    }
  };

  // Handle team edit
  const handleEdit = (team) => {
    setEditTeam(team);
  };

  // Update after editing the team
  const handleUpdate = () => {
    setEditTeam(null);
    fetchTeams(); // Refetch teams to get updated data after editing
  };

  return (
    <div>
      <h2>Admin Dashboard</h2>
      <button onClick={handleStartTimer}>⏱ Start Timer For All</button>
       <button className="reset-btn" onClick={async () => {
  if (window.confirm("Are you sure you want to reset all timers?")) {
    try {
      await resetTimer();
      alert("⏱ Timers reset for all teams!");
      fetchTeams();
    } catch (err) {
      alert("Failed to reset timers.");
      console.error(err);
    }
  }
}}>
  🔄 Reset All Timers
</button>


      <AddTeam onTeamAdded={fetchTeams} />
      {editTeam && <EditTeam team={editTeam} onUpdated={handleUpdate} />}
      <TeamList
        teams={teams}
        onEdit={handleEdit}
        onDelete={handleDelete}
        onStopTimer={handleStopTimer} // Pass the function here
      />
    </div>
  );
}

export default Dashboard;
