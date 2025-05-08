import React from "react";

function TeamList({ teams, onEdit, onDelete }) {
  return (
    <table border="1" cellPadding="10">
      <thead>
        <tr>
          <th>Team Name</th>
          <th>Points</th>
          <th>Actions</th>
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
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default TeamList;
