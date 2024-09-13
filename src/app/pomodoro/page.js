// app/pomodoro/page.js
"use client";

import { useState, useEffect } from 'react';
import db from '../../helpers/firebase'; // Adjust the import path if necessary
import { collection, getDocs, updateDoc, doc } from 'firebase/firestore';
import Menu from '@/components/Menu';

export default function PomodoroPage() {
    const [time, setTime] = useState(25 * 60);
    const [isActive, setIsActive] = useState(false);
    const [type, setType] = useState('work');
    const [tasks, setTasks] = useState([]);
    const [selectedTask, setSelectedTask] = useState(null);

    useEffect(() => {
        let interval = null;
        if (isActive && time > 0) {
            interval = setInterval(() => {
                setTime((time) => time - 1);
            }, 1000);
        } else if (time === 0) {
            setIsActive(false);
            setType(type === 'work' ? 'break' : 'work');
            setTime(type === 'work' ? 5 * 60 : 25 * 60);
        }
        return () => clearInterval(interval);
    }, [isActive, time, type]);

    const toggleTimer = () => {
        setIsActive(!isActive);
    };

    const resetTimer = () => {
        setIsActive(false);
        setType('work');
        setTime(25 * 60);
    };

    const formatTime = (time) => {
        const minutes = Math.floor(time / 60);
        const seconds = time % 60;
        return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    };

    const fetchTasks = async () => {
        try {
            const querySnapshot = await getDocs(collection(db, 'tasks'));
            const tasksArray = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
            setTasks(tasksArray);
        } catch (error) {
            console.error("Error fetching tasks: ", error);
        }
    };

    const handleUpdateTaskStatus = async (id, status) => {
        try {
            await updateDoc(doc(db, 'tasks', id), { status: status });
        } catch (error) {
            console.error("Error updating task status: ", error);
        }
    };

    useEffect(() => {
        fetchTasks();
    }, []);

    return (
        <div className="container">
            <main className="d-flex flex-column justify-content-center align-items-center min-vh-100">
                <h1 className="mb-5">Pomodoro Timer</h1>
                <div className="bg-body-tertiary rounded p-5" style={{ minWidth: "300px" }}>
                    <div className="card-body text-center">
                        <h2 className="mb-4">
                            {type === "work" ? "Time to Focus" : "Break Time"}
                        </h2>
                        <h3 className="display-1 mb-4">{formatTime(time)}</h3>
                        <button
                            className="btn btn-primary btn me-3"
                            onClick={toggleTimer}
                        >
                            {isActive ? "Pause" : "Start"}
                        </button>
                        <button className="btn btn-secondary btn" onClick={resetTimer}>
                            Reset
                        </button>
                        <div className="mt-4">
                            <h3>Select Task</h3>
                            <select
                                className="form-select"
                                value={selectedTask || ''}
                                onChange={(e) => setSelectedTask(e.target.value)}
                            >
                                <option value="">Select a Task</option>
                                {tasks.map(task => (
                                    <option key={task.id} value={task.id}>
                                        {task.status === 'incomplete' ? '🔲' : '✅'} {task.task}
                                    </option>
                                ))}
                            </select>
                            <button
                                className="btn btn-success mt-2"
                                onClick={() => selectedTask && handleUpdateTaskStatus(selectedTask, 'complete')}
                                disabled={!selectedTask}
                            >
                                Mark as Complete
                            </button>
                        </div>
                    </div>
                </div>
            </main>
            <Menu />
        </div>
    );
}
