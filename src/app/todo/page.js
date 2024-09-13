// app/todo/page.js
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

    const tasksCollectionRef = collection(db, 'tasks'); // Name of your Firestore collection
    const groupsCollectionRef = collection(db, 'groups'); // Name of your Firestore collection

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
        if (task.trim() === '') return;
        try {
            await addDoc(tasksCollectionRef, { 
              user: data.user.uid,
              task: task, 
              status: 'incomplete', 
              group: selectedGroup });
            setTask('');
            setSelectedGroup('');
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

    const handleUpdateTaskStatus = async (id, status) => {
        try {
            await updateDoc(doc(db, 'tasks', id), { status: status });
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

    useEffect(() => {
        fetchTasks();
        fetchGroups();
    }, []);

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
          <select
            className="form-select mt-2"
            value={selectedGroup}
            onChange={(e) => setSelectedGroup(e.target.value)}
          >
            <option value="">Select a Group</option>
            {groups.map((group) => (
              <option key={group.id} value={group.id}>
                {group.name}
              </option>
            ))}
          </select>
          <div className="d-flex justify-content-end">
            <button className="btn btn-primary my-2" onClick={handleAddTask}>
              Add Task
            </button>
          </div>
        </div>

        {/* Manage Groups */}
        <div className="mb-4">
          <button
            className="btn btn-secondary my-2"
            onClick={() =>
              document.getElementById("group-form").classList.toggle("d-none")
            }
          >
            Manage Groups
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
                {groups.map((group) => (
                  <div
                    key={group.id}
                    className="d-flex align-items-center mb-2"
                  >
                    {editGroupId === group.id ? (
                      <>
                        <input
                          type="text"
                          value={editGroupName}
                          onChange={(e) => setEditGroupName(e.target.value)}
                          className="form-control me-2"
                        />
                        <button
                          className="btn btn-success me-2"
                          onClick={handleUpdateGroup}
                        >
                          Save
                        </button>
                        <button
                          className="btn btn-secondary"
                          onClick={() => setEditGroupId("")}
                        >
                          Cancel
                        </button>
                      </>
                    ) : (
                      <>
                        <span className="me-2">{group.name}</span>
                        <button
                          className="btn btn-warning me-2"
                          onClick={() => {
                            setEditGroupId(group.id);
                            setEditGroupName(group.name);
                          }}
                        >
                          Edit
                        </button>
                        <button
                          className="btn btn-danger"
                          onClick={() => handleDeleteGroup(group.id)}
                        >
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

        {/* Task list */}
        <ul className="list-group">
          {tasks.map(({ id, task, status, group }) => (
            <li
              key={id}
              className="list-group-item d-flex justify-content-between align-items-center"
              style={{
                backgroundColor:
                  status === "incomplete" ? "#f8d7da" : "#d4edda",
              }}
            >
              <span>
                {group && (
                  <strong>{groups.find((g) => g.id === group)?.name}: </strong>
                )}
                {task}
              </span>
              <div>
                <button
                  className="btn btn-secondary btn-sm me-2"
                  onClick={() =>
                    handleUpdateTaskStatus(
                      id,
                      status === "incomplete" ? "complete" : "incomplete"
                    )
                  }
                >
                  {status === "incomplete"
                    ? "Change to Complete"
                    : "Change to Incomplete"}
                </button>
                <button
                  className="btn btn-danger btn-sm"
                  onClick={() => handleDeleteTask(id)}
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
        <Menu />
      </div>
    );
}
