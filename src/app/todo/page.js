// app/todo/page.js

"use client"; // Ensure client-side rendering

import Menu from '@/components/Menu';
import { useState } from 'react';

export default function Todo() {
  const [task, setTask] = useState('');
  const [tasks, setTasks] = useState([]);

  const handleAddTask = () => {
    if (task.trim() === '') return;
    setTasks([...tasks, task]);
    setTask('');
  };

  const handleDeleteTask = (index) => {
    const newTasks = tasks.filter((_, i) => i !== index);
    setTasks(newTasks);
  };

  return (
    <div className="container my-5">
      <h1 className="mb-4">ToDo List</h1>

      {/* Input field and Add button */}
      <div className="mb-4">
        <input
          type="text"
          value={task}
          onChange={(e) => setTask(e.target.value)}
          placeholder="Add a new task"
          className="form-control"
        />
        <div className='d-flex justify-content-end'>
          <button className="btn btn-primary my-2" onClick={handleAddTask}>
            Add Task
          </button>
        </div>
      </div>

      {/* Task list */}
      <ul className="list-group">
        {tasks.map((task, index) => (
          <li
            key={index}
            className="list-group-item d-flex justify-content-between align-items-center"
          >
            {task}
            <button
              className="btn btn-danger btn-sm"
              onClick={() => handleDeleteTask(index)}
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
      <Menu />
    </div>
  );
}
