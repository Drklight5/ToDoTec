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

  const goToPreviousMonth = () => {
    setSelectedDate(prevDate => {
      const newDate = new Date(prevDate.getFullYear(), prevDate.getMonth() - 1, 1);
      return newDate;
    });
  };

  const goToNextMonth = () => {
    setSelectedDate(prevDate => {
      const newDate = new Date(prevDate.getFullYear(), prevDate.getMonth() + 1, 1);
      return newDate;
    });
  };

  return (
    <div className="calendar-container">
      <h1>Calendar</h1>
      <div className="calendar-header">
        <button onClick={goToPreviousMonth} className="nav-button">Previous</button>
        <h2>{selectedDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}</h2>
        <button onClick={goToNextMonth} className="nav-button">Next</button>
      </div>
      <div className="main-content">
        <div className="calendar-grid">
          {days.map((day) => (
            <div
              key={day}
              className="calendar-day"
              onClick={() => handleDateClick(day)}
            >
              {day}
            </div>
          ))}
        </div>
        <div className="tasks-container">
          <div className="tasks-header">
            <span className="tasks-label">Tasks for</span>
            <span className="tasks-date">{selectedDate.toDateString()}</span>
          </div>
          <ul className="task-list">
            {tasks.map((task, index) => (
              <li key={index} className="task-item">
                {task.name}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <style jsx>{`
        .calendar-container {
          padding: 20px;
          background-color: #e0f7fa; /* Color aqua claro para el fondo completo */
          min-height: 100vh; /* Asegura que el contenedor abarque al menos la altura completa de la vista */
        }

        h1 {
          color: #00bcd4; /* Color aqua */
          margin: 0;
          text-align: center; /* Alinear el título al centro */
        }

        .calendar-header {
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 20px 0; /* Separar del título Calendar */
        }

        .nav-button {
          background-color: #00bcd4; /* Color aqua */
          border: none;
          color: white;
          padding: 5px 10px; /* Tamaño reducido */
          margin: 0 5px; /* Tamaño reducido */
          cursor: pointer;
          border-radius: 5px;
          font-size: 0.875em; /* Tamaño de fuente reducido */
        }

        .nav-button:hover {
          background-color: #0097a7; /* Color aqua oscuro */
        }

        h2 {
          color: #00bcd4; /* Color aqua */
          margin: 0;
          font-size: 1.2em; /* Tamaño de fuente ajustado para el título del mes */
        }

        .main-content {
          display: flex;
          justify-content: center; /* Centrar el contenido horizontalmente */
          gap: 20px; /* Espacio entre el calendario y la sección de tareas */
        }

        .calendar-grid {
          display: grid;
          grid-template-columns: repeat(7, 1fr);
          gap: 1px;
          background-color: #00bcd4; /* Color aqua */
        }

        .calendar-day {
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 15px; /* Tamaño reducido */
          cursor: pointer;
          border: 1px solid #00bcd4; /* Color aqua */
          text-align: center;
          background-color: #fff;
          transition: background-color 0.3s, color 0.3s;
        }

        .calendar-day:hover {
          background-color: #00bcd4; /* Color aqua */
          color: #fff;
        }

        .tasks-container {
          padding: 15px;
          background: #00bcd4; /* Color aqua */
          border-radius: 8px;
          flex: 1;
          max-width: 300px; /* Máximo ancho para la sección de tareas */
        }

        .tasks-header {
          margin-bottom: 15px;
          text-align: center;
        }

        .tasks-label {
          color: #fff;
          font-weight: bold;
          display: block;
        }

        .tasks-date {
          color: #004d40; /* Verde oscuro */
          font-weight: bold;
          margin-top: 5px;
          font-size: 1.25em; /* Aumentar tamaño del texto */
        }

        .task-list {
          list-style-type: none;
          padding: 0;
          margin: 0;
        }

        .task-item {
          padding: 10px;
          border-bottom: 1px solid #ccc;
          color: #333;
        }
      `}</style>
    </div>
  );
};

export default CalendarView;
