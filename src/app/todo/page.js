"use client"; // Ensure client-side rendering

import { useEffect, useState } from 'react';
import db from '../../helpers/firebase'; // Adjust the import path if necessary
import { collection, addDoc, getDocs, deleteDoc, updateDoc, doc } from 'firebase/firestore';
import Menu from '@/components/Menu';
import { useAppContext } from '@/helpers/context';
import { Validate } from '@/components/Validate';

export default function Todo() {

    const {data} = useAppContext()
    const [task, setTask] = useState('');
    const [tasks, setTasks] = useState([]);
    const [groups, setGroups] = useState([]);
    const [selectedGroup, setSelectedGroup] = useState('');
    const [newGroupName, setNewGroupName] = useState('');
    const [editGroupId, setEditGroupId] = useState('');
    const [editGroupName, setEditGroupName] = useState('');
    const [dueDate, setDueDate] = useState('');
    const [selectedDate, setSelectedDate] = useState('');
    const [editTaskId, setEditTaskId] = useState('');
    const [editTask, setEditTask] = useState('');
    const [editDate, setEditDate] = useState('');
    const [editTaskGroup, setEditTaskGroup] = useState('');

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
            const groupsArray = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
            setGroups(groupsArray);
        } catch (error) {
            console.error("Error fetching groups: ", error);
        }
    };

    const handleAddTask = async () => {
        if (task.trim() === '' || dueDate === '') return;
        try {
            await addDoc(tasksCollectionRef, {
                task: task,
                status: 'incomplete', // Default status
                group: selectedGroup,
                date: new Date(dueDate).toISOString(), // Save date as timestamp
            });
            setTask('');
            setSelectedGroup('');
            setDueDate('');
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

    const handleUpdateTaskStatus = async (id, currentStatus) => {
        const newStatus = currentStatus === 'complete' ? 'incomplete' : 'complete';
        try {
            await updateDoc(doc(db, 'tasks', id), { status: newStatus });
            fetchTasks(); // Refresh the task list
        } catch (error) {
            console.error("Error updating task status: ", error);
        }
    };

    const handleCreateGroup = async () => {
        if (newGroupName.trim() === '') return;
        try {
            await addDoc(groupsCollectionRef, { name: newGroupName });
            setNewGroupName('');
            fetchGroups(); // Refresh the group list
        } catch (error) {
            console.error("Error creating group: ", error);
        }
    };

    const handleDeleteGroup = async (id) => {
        try {
            await deleteDoc(doc(db, 'groups', id));
            fetchGroups(); // Refresh the group list
        } catch (error) {
            console.error("Error deleting group: ", error);
        }
    };

    const handleUpdateGroup = async () => {
        if (editGroupName.trim() === '') return;
        try {
            await updateDoc(doc(db, 'groups', editGroupId), { name: editGroupName });
            setEditGroupName('');
            setEditGroupId('');
            fetchGroups(); // Refresh the group list
        } catch (error) {
            console.error("Error updating group: ", error);
        }
    };

    const handleEditTask = async () => {
        if (editTask.trim() === '' || editDate === '') return;
        try {
            await updateDoc(doc(db, 'tasks', editTaskId), {
                task: editTask,
                date: new Date(editDate).toISOString(),
                group: editTaskGroup,
            });
            setEditTaskId('');
            setEditTask('');
            setEditDate('');
            setEditTaskGroup('');
            fetchTasks(); // Refresh the task list
        } catch (error) {
            console.error("Error updating task: ", error);
        }
    };

    useEffect(() => {
        fetchTasks();
        fetchGroups();
    }, []);

    const filteredTasks = tasks.filter(task => {
        return selectedDate === '' || new Date(task.date).toDateString() === new Date(selectedDate).toDateString();
    });

    return (
      <div className="container my-5">
        <Validate/>
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
                <input
                    type="date"
                    value={dueDate}
                    onChange={(e) => setDueDate(e.target.value)}
                    className="form-control mt-2"
                />
                <select
                    className="form-select mt-2"
                    value={selectedGroup}
                    onChange={(e) => setSelectedGroup(e.target.value)}
                >
                    <option value="">Select a Group</option>
                    {groups.map(group => (
                        <option key={group.id} value={group.id}>
                            {group.name}
                        </option>
                    ))}
                </select>
                <div className='d-flex justify-content-end'>
                    <button className="btn btn-primary my-2" onClick={handleAddTask}>
                        Add Task
                    </button>
                </div>
            </div>

            {/* Manage Groups */}
            <div className="mb-4">
                <button
                    className="btn btn-secondary my-2"
                    onClick={() => document.getElementById('group-form').classList.toggle('d-none')}
                >
                    Manage Groups <span className="ms-2">&#9660;</span>
                </button>
                <div id="group-form" className="d-none">
                    <h3>Create Group</h3>
                    <input
                        type="text"
                        value={newGroupName}
                        onChange={(e) => setNewGroupName(e.target.value)}
                        placeholder="New Group Name"
                        className="form-control mb-2"
                    />
                    <button className="btn btn-primary" onClick={handleCreateGroup}>
                        Create Group
                    </button>
                    {groups.length > 0 && (
                        <div className="mt-3">
                            <h4>Edit or Delete Groups</h4>
                            {groups.map(group => (
                                <div key={group.id} className="d-flex align-items-center mb-2">
                                    {editGroupId === group.id ? (
                                        <>
                                            <input
                                                type="text"
                                                value={editGroupName}
                                                onChange={(e) => setEditGroupName(e.target.value)}
                                                className="form-control me-2"
                                            />
                                            <button className="btn btn-success me-2" onClick={handleUpdateGroup}>
                                                Save
                                            </button>
                                            <button className="btn btn-secondary" onClick={() => setEditGroupId('')}>
                                                Cancel
                                            </button>
                                        </>
                                    ) : (
                                        <>
                                            <span className="me-2">{group.name}</span>
                                            <button className="btn btn-warning me-2" onClick={() => {
                                                setEditGroupId(group.id);
                                                setEditGroupName(group.name);
                                            }}>
                                                Edit
                                            </button>
                                            <button className="btn btn-danger" onClick={() => handleDeleteGroup(group.id)}>
                                                Delete
                                            </button>
                                        </>
                                    )}
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>

            {/* Filter Tasks by Date */}
            <div className="mb-4">
                <input
                    type="date"
                    value={selectedDate}
                    onChange={(e) => setSelectedDate(e.target.value)}
                    className="form-control"
                />
            </div>

            {/* Task list */}
            <ul className="list-group">
                {filteredTasks.map(({ id, task, status, group, date }) => (
                    <li
                        key={id}
                        className="list-group-item d-flex justify-content-between align-items-center"
                        style={{ backgroundColor: status === 'complete' ? '#d4edda' : '#f8d7da' }}
                    >
                        <div>
                            <strong>{task}</strong>
                            <br />
                            <small>{new Date(date).toDateString()}</small>
                            <br />
                            <small>Group: {groups.find(g => g.id === group)?.name || 'None'}</small>
                        </div>
                        <div>
                            <button
                                className={`btn ${status === 'complete' ? 'btn-secondary' : 'btn-success'} me-2`}
                                onClick={() => handleUpdateTaskStatus(id, status)}
                            >
                                {status === 'complete' ? 'Mark Incomplete' : 'Mark Complete'}
                            </button>
                            <button
                                className="btn btn-danger me-2"
                                onClick={() => handleDeleteTask(id)}
                            >
                                Delete
                            </button>
                            <button
                                className="btn btn-info"
                                onClick={() => {
                                    setEditTaskId(id);
                                    setEditTask(task);
                                    setEditDate(date.split('T')[0]);
                                    setEditTaskGroup(group);
                                }}
                            >
                                Edit
                            </button>
                        </div>
                    </li>
                ))}
            </ul>

            {/* Edit Task Form */}
            {editTaskId && (
                <div className="mt-4">
                    <h3>Edit Task</h3>
                    <input
                        type="text"
                        value={editTask}
                        onChange={(e) => setEditTask(e.target.value)}
                        className="form-control mb-2"
                    />
                    <input
                        type="date"
                        value={editDate}
                        onChange={(e) => setEditDate(e.target.value)}
                        className="form-control mb-2"
                    />
                    <select
                        className="form-select mb-2"
                        value={editTaskGroup}
                        onChange={(e) => setEditTaskGroup(e.target.value)}
                    >
                        <option value="">Select a Group</option>
                        {groups.map(group => (
                            <option key={group.id} value={group.id}>
                                {group.name}
                            </option>
                        ))}
                    </select>
                    <button className="btn btn-success" onClick={handleEditTask}>
                        Save Changes
                    </button>
                    <button className="btn btn-secondary ms-2" onClick={() => setEditTaskId('')}>
                        Cancel
                    </button>
                </div>
            )}

            <Menu />
        </div>
    );
}
