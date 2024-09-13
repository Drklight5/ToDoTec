// app/todo/page.js

"use client"; // Ensure client-side rendering

import { useEffect, useState } from 'react';
import db from '../../helpers/firebase'; // Adjust the import path if necessary
import { collection, addDoc, getDocs, deleteDoc, doc, updateDoc } from 'firebase/firestore';
import Menu from '@/components/Menu';

export default function Todo() {
    const [task, setTask] = useState('');
    const [tasks, setTasks] = useState([]);
    const [groups, setGroups] = useState([]);
    const [selectedGroup, setSelectedGroup] = useState('');
    const [showManageGroups, setShowManageGroups] = useState(false);
    const [newGroupName, setNewGroupName] = useState('');

    const tasksCollectionRef = collection(db, 'tasks');
    const groupsCollectionRef = collection(db, 'groups');

    const fetchTasks = async () => {
        try {
            const querySnapshot = await getDocs(tasksCollectionRef);
            const tasksArray = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
            setTasks(tasksArray);
        } catch (error) {
            console.error("Error fetching tasks: ", error);
        }
    };

    const fetchGroups = async () => {
        try {
            const querySnapshot = await getDocs(groupsCollectionRef);
            const groupsArray = querySnapshot.docs.map(doc => ({ id: doc.id, name: doc.data().name }));
            setGroups(groupsArray);
        } catch (error) {
            console.error("Error fetching groups: ", error);
        }
    };

    const handleAddTask = async () => {
        if (task.trim() === '') return;
        try {
            await addDoc(tasksCollectionRef, { task: task, group: selectedGroup });
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

    const handleAddGroup = async () => {
        if (newGroupName.trim() === '') return;
        try {
            await addDoc(groupsCollectionRef, { name: newGroupName });
            setNewGroupName('');
            fetchGroups(); // Refresh the groups list
        } catch (error) {
            console.error("Error adding group: ", error);
        }
    };

    const handleDeleteGroup = async (id) => {
        try {
            await deleteDoc(doc(db, 'groups', id));
            // Also remove tasks assigned to this group
            const querySnapshot = await getDocs(tasksCollectionRef);
            const tasksArray = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
            const tasksToDelete = tasksArray.filter(task => task.group === id);
            for (const task of tasksToDelete) {
                await deleteDoc(doc(db, 'tasks', task.id));
            }
            fetchGroups(); // Refresh the groups list
        } catch (error) {
            console.error("Error deleting group: ", error);
        }
    };

    useEffect(() => {
        fetchTasks();
        fetchGroups();
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
                    <select
                        className="form-control mt-2"
                        value={selectedGroup}
                        onChange={(e) => setSelectedGroup(e.target.value)}
                    >
                        <option value="">Select a group</option>
                        {groups.map(({id, name}) => (
                            <option key={id} value={id}>{name}</option>
                        ))}
                    </select>
                    <button className="btn btn-primary my-2" onClick={handleAddTask}>
                        Add Task
                    </button>
                </div>
            </div>

            {/* Manage Groups */}
            <div className="mb-4">
                <button
                    className="btn btn-secondary"
                    onClick={() => setShowManageGroups(!showManageGroups)}
                >
                    {showManageGroups ? 'Close Group Management' : 'Manage Groups'}
                </button>
                {showManageGroups && (
                    <div className="mt-3">
                        <input
                            type="text"
                            value={newGroupName}
                            onChange={(e) => setNewGroupName(e.target.value)}
                            placeholder="New group name"
                            className="form-control mb-2"
                        />
                        <button
                            className="btn btn-primary mb-2"
                            onClick={handleAddGroup}
                        >
                            Add Group
                        </button>
                        <ul className="list-group">
                            {groups.map(({id, name}) => (
                                <li
                                    key={id}
                                    className="list-group-item d-flex justify-content-between align-items-center"
                                >
                                    {name}
                                    <button
                                        className="btn btn-danger btn-sm"
                                        onClick={() => handleDeleteGroup(id)}
                                    >
                                        Delete
                                    </button>
                                </li>
                            ))}
                        </ul>
                    </div>
                )}
            </div>

            {/* Task list */}
            <ul className="list-group">
                {tasks.map(({id, task, group}) => {
                    // Find the group name for the current task
                    const groupName = groups.find(g => g.id === group)?.name || 'No Group';

                    return (
                        <li
                            key={id}
                            className="list-group-item d-flex justify-content-between align-items-center"
                        >
                            <strong>{groupName}</strong>: {task}
                            <button
                                className="btn btn-danger btn-sm"
                                onClick={() => handleDeleteTask(id)}
                            >
                                Delete
                            </button>
                        </li>
                    );
                })}
            </ul>

            <Menu/>
        </div>
    );
}
