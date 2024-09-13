'use client';
import { useState, useEffect } from 'react';
import { getTasksForDate } from '../../helpers/api';

const CalendarView = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [tasks, setTasks] = useState([]);
  const [days, setDays] = useState([]);

  useEffect(() => {
    const start = new Date(selectedDate.getFullYear(), selectedDate.getMonth(), 1);
    const end = new Date(selectedDate.getFullYear(), selectedDate.getMonth() + 1, 0);
    const newDays = [];

    for (let day = start.getDate(); day <= end.getDate(); day++) {
      newDays.push(day);
    }

    setDays(newDays);
  }, [selectedDate]);

  useEffect(() => {
    const fetchTasks = async () => {
      const tasksForDate = await getTasksForDate(selectedDate.toISOString().split('T')[0]);
      setTasks(tasksForDate);
    };

    fetchTasks();
  }, [selectedDate]);

  const handleDateClick = (day) => {
    const newDate = new Date(selectedDate.getFullYear(), selectedDate.getMonth(), day);
    setSelectedDate(newDate);
  };

  return (
    <div style={{ padding: '20px', textAlign: 'center' }}>
      <h1>Calendario</h1>
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(7, 1fr)',
        gap: '1px',
        maxWidth: '700px',
        margin: 'auto'
      }}>
        {days.map((day) => (
          <div
            key={day}
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '20px',
              cursor: 'pointer',
              border: '1px solid #ccc',
              textAlign: 'center',
              backgroundColor: '#fff'
            }}
            onClick={() => handleDateClick(day)}
          >
            {day}
          </div>
        ))}
      </div>
      <h2>Tareas para {selectedDate.toDateString()}:</h2>
      <ul style={{ listStyleType: 'none', padding: '0' }}>
        {tasks.map((task, index) => (
          <li key={index} style={{ padding: '5px', borderBottom: '1px solid #ccc' }}>
            {task.name}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CalendarView;
