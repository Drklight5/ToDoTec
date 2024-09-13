// app/todo/page.js

"use client"; // Ensure client-side rendering

import { useEffect, useState } from 'react';
import db from '../../helpers/firebase'; // Adjust the import path if necessary
import { collection, addDoc, getDocs, deleteDoc, doc } from 'firebase/firestore';
import Menu from '@/components/Menu';

export default function Todo() {
    const [task, setTask] = useState('');
    const [tasks, setTasks] = useState([]);

    const tasksCollectionRef = collection(db, 'tasks'); // Name of your Firestore collection

    const fetchTasks = async () => {
        try {
            const querySnapshot = await getDocs(tasksCollectionRef);
            const tasksArray = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
            setTasks(tasksArray);
        } catch (error) {
            console.error("Error fetching tasks: ", error);
        }
    };

    const handleAddTask = async () => {
        if (task.trim() === '') return;
        try {
            await addDoc(tasksCollectionRef, { task: task });
            setTask('');
            fetchTasks(); // Refresh the task list
        } catch (error) {
            console.error("Error adding task: ", error);
        }
    };

    const handleDeleteTask = async (id) => {
        try {
            await deleteDoc(doc(db, 'tasks', id));
            fetchTasks(); // Refresh the task list
        } catch (error) {
            console.error("Error deleting task: ", error);
        }
    };

    useEffect(() => {
        fetchTasks();
    }, []);

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
                {tasks.map(({ id, task }) => (
                    <li
                        key={id}
                        className="list-group-item d-flex justify-content-between align-items-center"
                    >
                        {task}
                        <button
                            className="btn btn-danger btn-sm"
                            onClick={() => handleDeleteTask(id)}
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
