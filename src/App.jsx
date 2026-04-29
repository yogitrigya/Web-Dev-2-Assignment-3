import React, { useState } from 'react';
import Header from './components/Header';
import StudentTable from './components/StudentTable';
import AddStudentForm from './components/AddStudentForm';
import './index.css';

function App() {
  const [students, setStudents] = useState([
    { id: 1, name: "Rohan", score: 85 },
    { id: 2, name: "Mohan", score: 38 },
    { id: 3, name: "Rahul", score: 92 },
    { id: 4, name: "Kartik", score: 78 },
    { id: 5, name: "Priya", score: 65 },
  ]);

  const addStudent = (name, score) => {
    const newId = Math.max(...students.map(s => s.id)) + 1;
    const newStudent = {
      id: newId,
      name: name,
      score: score
    };
    setStudents([...students, newStudent]);
  };

  const updateStudent = (id, updatedData) => {
    setStudents(students.map(student => 
      student.id === id ? { ...student, ...updatedData } : student
    ));
  };

  return (
    <div className="container">
      <Header />
      <AddStudentForm onAddStudent={addStudent} />
      <StudentTable students={students} onUpdateStudent={updateStudent} />
    </div>
  );
}

export default App;
