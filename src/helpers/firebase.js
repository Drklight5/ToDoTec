// firebase.js

// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getFirestore, collection, getDocs, addDoc, updateDoc, doc, deleteDoc } from 'firebase/firestore';
import { getAuth, GoogleAuthProvider, GithubAuthProvider } from 'firebase/auth';

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAfSLETg6fgznM9pRZXsLapPYNR0vQgeVI",
  authDomain: "todotec-bb970.firebaseapp.com",
  projectId: "todotec-bb970",
  storageBucket: "todotec-bb970.appspot.com",
  messagingSenderId: "898061488037",
  appId: "1:898061488037:web:248f72216b138af40fe24c",
  measurementId: "G-Z533VREMKP"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Auth providers
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
export const githubProvider = new GithubAuthProvider();

// Firestore instance
const db = getFirestore(app);

// Firestore CRUD operations for tasks

// Add a new task
export const addTask = async (task) => {
  try {
    const docRef = await addDoc(collection(db, 'tasks'), task);
    console.log('Task added with ID: ', docRef.id);
  } catch (error) {
    console.error('Error adding task: ', error);
  }
};

// Get all tasks
export const getTasks = async () => {
  const tasks = [];
  const querySnapshot = await getDocs(collection(db, 'tasks'));
  querySnapshot.forEach((doc) => {
    tasks.push({ id: doc.id, ...doc.data() });
  });
  return tasks;
};

// Update a task
export const updateTask = async (id, updatedTask) => {
  const taskDocRef = doc(db, 'tasks', id);
  try {
    await updateDoc(taskDocRef, updatedTask);
    console.log('Task updated successfully');
  } catch (error) {
    console.error('Error updating task: ', error);
  }
};

// Delete a task
export const deleteTask = async (id) => {
  const taskDocRef = doc(db, 'tasks', id);
  try {
    await deleteDoc(taskDocRef);
    console.log('Task deleted successfully');
  } catch (error) {
    console.error('Error deleting task: ', error);
  }
};

export default db;
