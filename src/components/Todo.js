// src/components/Todo.jsx
import React, { useState, useEffect } from 'react';
import './Todo.css';

const Todo = () => {
  const [task, setTask] = useState(''); // Current input
  const [tasks, setTasks] = useState([]); // List of tasks
  const [editingIndex, setEditingIndex] = useState(-1); // Index of task being edited

  // Load tasks from local storage on component mount
  useEffect(() => {
    const storedTasks = JSON.parse(localStorage.getItem('tasks')) || [];
    setTasks(storedTasks);
  }, []);

  // Update local storage whenever tasks change
  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  // Add or update a task
  const handleTaskSubmit = (e) => {
    e.preventDefault();
    if (task.trim()) {
      if (editingIndex === -1) {
        // Add new task
        setTasks([...tasks, { text: task, completed: false }]);
      } else {
        // Update existing task
        const updatedTasks = tasks.map((t, index) =>
          index === editingIndex ? { ...t, text: task } : t
        );
        setTasks(updatedTasks);
        setEditingIndex(-1);
      }
      setTask(''); // Clear input field
    }
  };

  // Toggle task completion status
  const toggleTaskCompletion = (index) => {
    const updatedTasks = tasks.map((task, idx) => {
      if (idx === index) {
        return { ...task, completed: !task.completed }; // Toggle completion status
      }
      return task;
    });
    setTasks(updatedTasks);
  };

  // Edit a task
  const editTask = (index) => {
    setTask(tasks[index].text);
    setEditingIndex(index);
  };

  // Delete a task
  const deleteTask = (index) => {
    const updatedTasks = tasks.filter((_, idx) => idx !== index);
    setTasks(updatedTasks);
  };

  return (
    <div className="todo-container">
      <h2>My To-Do List</h2>
      <form onSubmit={handleTaskSubmit} className="todo-form">
        <input
          type="text"
          value={task}
          onChange={(e) => setTask(e.target.value)}
          placeholder="Add a new task..."
          className="todo-input"
        />
        <button type="submit" className="todo-button">
          {editingIndex === -1 ? 'Add Task' : 'Update Task'}
        </button>
      </form>

      <ul className="todo-list">
        {tasks.map((task, index) => (
          <li key={index} className={task.completed ? 'completed' : ''}>
            <button 
              onClick={() => toggleTaskCompletion(index)} 
              className={`tick-button ${task.completed ? 'ticked' : ''}`}
            >
              ✓
            </button>
            <span 
              onClick={() => toggleTaskCompletion(index)} 
              style={{ cursor: 'pointer', color: task.completed ? 'green' : 'black' }}
            >
              {task.text}
            </span>
            <div>
              <button onClick={() => editTask(index)} className="edit-button">Edit</button>
              <button onClick={() => deleteTask(index)} className="delete-button">Delete</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Todo;
