import React, { useState } from 'react';

function AddStudentForm({ onAddStudent }) {
  const [name, setName] = useState('');
  const [score, setScore] = useState('');
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};
    
    if (!name.trim()) {
      newErrors.name = 'Name is required';
    } else if (name.trim().length < 2) {
      newErrors.name = 'Name must be at least 2 characters';
    }
    
    if (!score) {
      newErrors.score = 'Score is required';
    } else {
      const scoreNum = Number(score);
      if (isNaN(scoreNum) || scoreNum < 0 || scoreNum > 100) {
        newErrors.score = 'Score must be between 0 and 100';
      }
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      onAddStudent(name.trim(), Number(score));
      setName('');
      setScore('');
      setErrors({});
    }
  };

  return (
    <div className="form-container">
      <h2>Add New Student</h2>
      <form onSubmit={handleSubmit} className="form-layout">
        <div className="input-group">
          <label>Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter student name"
            className={errors.name ? 'error' : ''}
          />
          {errors.name && <span className="error-message">{errors.name}</span>}
        </div>
        
        <div className="input-group">
          <label>Score</label>
          <input
            type="number"
            value={score}
            onChange={(e) => setScore(e.target.value)}
            placeholder="0-100"
            min="0"
            max="100"
            className={errors.score ? 'error' : ''}
          />
          {errors.score && <span className="error-message">{errors.score}</span>}
        </div>

        <button type="submit">Add Student</button>
      </form>
    </div>
  );
}

export default AddStudentForm;
