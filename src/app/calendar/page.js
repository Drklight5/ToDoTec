'use client';
import { useState, useEffect } from 'react';
import { getTasksForDate } from '../../helpers/api';
import Menu from "@/components/Menu";
import { Validate } from '@/components/Validate';

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
      <Validate/>
      <h1>Calendar</h1>
      <div className="calendar-header">
        <button onClick={goToPreviousMonth} className="nav-button">
          Previous
        </button>
        <h2>
          {selectedDate.toLocaleDateString("en-US", {
            month: "long",
            year: "numeric",
          })}
        </h2>
        <button onClick={goToNextMonth} className="nav-button">
          Next
        </button>
      </div>
      <div className="main-content d-flex flex-wrap">
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
          background-color: #ffffff; /* Fondo blanco */
          min-height: 100vh;
        }

        h1 {
          color: #097d8a; /* Color aqua oscuro */
          margin: 0;
          text-align: center;
        }

        .calendar-header {
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 20px 0;
        }

        .nav-button {
          background-color: #097d8a; /* Color aqua oscuro */
          border: none;
          color: white;
          padding: 5px 10px;
          margin: 0 5px;
          cursor: pointer;
          border-radius: 5px;
          font-size: 0.875em;
        }

        .nav-button:hover {
          background-color: #005f6b; /* Color aqua oscuro más intenso */
        }

        h2 {
          color: #097d8a; /* Color aqua oscuro */
          margin: 0;
          font-size: 1.2em;
        }

        .main-content {
          display: flex;
          justify-content: center;
          gap: 20px;
        }

        .calendar-grid {
          display: grid;
          grid-template-columns: repeat(7, 1fr);
          gap: 1px;
          background-color: #097d8a; /* Color aqua oscuro */
        }

        .calendar-day {
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 15px;
          cursor: pointer;
          border: 1px solid #097d8a; /* Color aqua oscuro */
          text-align: center;
          background-color: #ffffff;
          transition: background-color 0.3s, color 0.3s;
        }

        .calendar-day:hover {
          background-color: #097d8a; /* Color aqua oscuro */
          color: #ffffff;
        }

        .tasks-container {
          padding: 15px;
          background: #bcde40; /* Verde brillante */
          border-radius: 8px;
          flex: 1;
          max-width: 300px;
        }

        .tasks-header {
          margin-bottom: 15px;
          text-align: center;
        }

        .tasks-label {
          color: #ffffff;
          font-weight: bold;
          display: block;
        }

        .tasks-date {
          color: #000000; /* Color negro */
          font-weight: bold;
          margin-top: 5px;
          font-size: 1.25em;
        }

        .task-list {
          list-style-type: none;
          padding: 0;
          margin: 0;
        }

        .task-item {
          padding: 10px;
          border-bottom: 1px solid #ccc;
          color: #333333;
        }
      `}</style>
      <Menu />
    </div>
  );
};

export default CalendarView;
