import React from "react";

function TeamList({ teams, onEdit, onDelete, onStopTimer }) {
  // Function to convert seconds to minutes and seconds format
  const formatTime = (seconds) => {
    if (seconds === null) return "--"; // Handle null case
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}m ${remainingSeconds}s`; // Display minutes and seconds
  };

  return (
    <table border="1" cellPadding="10">
      <thead>
        <tr>
          <th>Team Name</th>
          <th>Points</th>
          <th>Actions</th>
          <th>Time Taken</th> {/* Time Taken column */}
          <th>Stop Timer</th> {/* Stop Timer column */}
        </tr>
      </thead>
      <tbody>
        {teams.map((team) => (
          <tr key={team._id}>
            <td>{team.name}</td>
            <td>{team.points}</td>
            <td>
              <button onClick={() => onEdit(team)}>Edit</button>
              <button onClick={() => onDelete(team._id)}>Delete</button>
            </td>
            <td>
              {formatTime(team.totalTimeTaken)} {/* Format and display time */}
            </td>
            <td>
              <button
                onClick={() => onStopTimer(team._id)} // Call onStopTimer with team id
                disabled={team.totalTimeTaken !== null} // Disable if timeTaken is already set
              >
                🛑 Stop Timer
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default TeamList;
