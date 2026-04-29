import React, { useState } from 'react';

function StudentRow({ student, onUpdateStudent }) {
  const [newName, setNewName] = useState('');
  const [newScore, setNewScore] = useState('');
  const [isEditing, setIsEditing] = useState(false);

  const isPass = student.score >= 40;
  const statusClass = isPass ? 'status-pass' : 'status-fail';
  const statusText = isPass ? 'Pass' : 'Fail';

  const handleEdit = () => {
    setNewName(student.name);
    setNewScore(student.score.toString());
    setIsEditing(true);
  };

  const handleUpdate = () => {
    const trimmedName = newName.trim();
    const score = Number(newScore);

    if (!trimmedName || trimmedName.length < 2) {
      alert('Name must be at least 2 characters');
      return;
    }

    if (newScore === '' || isNaN(score) || score < 0 || score > 100) {
      alert('Please enter a valid score between 0 and 100');
      return;
    }

    onUpdateStudent(student.id, { name: trimmedName, score });
    setNewName('');
    setNewScore('');
    setIsEditing(false);
  };

  const handleCancel = () => {
    setNewName('');
    setNewScore('');
    setIsEditing(false);
  };

  return (
    <tr>
      <td>{student.name}</td>
      <td>{student.score}</td>
      <td>
        <span className={`status-badge ${statusClass}`}>
          {statusText}
        </span>
      </td>
      <td className="action-cell">
        {isEditing ? (
          <>
            <input
              type="text"
              value={newName}
              onChange={(e) => setNewName(e.target.value)}
              placeholder="Student name"
              autoFocus
            />
            <input
              type="number"
              value={newScore}
              onChange={(e) => setNewScore(e.target.value)}
              placeholder="0-100"
              min="0"
              max="100"
            />
            <button onClick={handleUpdate}>Save</button>
            <button
              onClick={handleCancel}
              style={{ background: '#6b7280' }}
            >
              Cancel
            </button>
          </>
        ) : (
          <button onClick={handleEdit}>Edit</button>
        )}
      </td>
    </tr>
  );
}

export default StudentRow;
