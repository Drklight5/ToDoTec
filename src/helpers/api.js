import { collection, getDocs } from 'firebase/firestore';
import db, { getTasks } from '../helpers/firebase'; // Asegúrate de que la ruta sea correcta

export const getTasksForDate = async (date) => {
  try {
    const tasks = await getTasks();
    return tasks.filter(task => {
      const taskDate = new Date(task.date.seconds * 1000).toISOString().split('T')[0];
      return taskDate === date;
    });
  } catch (error) {
    console.error('Error fetching tasks for date: ', error);
    return [];
  }
};


    const tasksCollectionRef = collection(db, "tasks");
export  const fetchTasks = async () => {
      try {
        const querySnapshot = await getDocs(tasksCollectionRef);
        const tasksArray = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        return tasksArray;
      } catch (error) {
        console.error("Error fetching tasks: ", error);
      }
      return []
};

    const fetchGroups = async () => {
      try {
        const querySnapshot = await getDocs(groupsCollectionRef);
        const groupsArray = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setGroups(groupsArray);
      } catch (error) {
        console.error("Error fetching groups: ", error);
      }
    };

    const handleAddTask = async () => {
      if (task.trim() === "" || dueDate === "") return;
      try {
        await addDoc(tasksCollectionRef, {
          task: task,
          status: "incomplete", // Default status
          group: selectedGroup,
          date: new Date(dueDate).toISOString(), // Save date as timestamp
        });
        setTask("");
        setSelectedGroup("");
        setDueDate("");
        fetchTasks(); // Refresh the task list
      } catch (error) {
        console.error("Error adding task: ", error);
      }
    };

    const handleDeleteTask = async (id) => {
      try {
        await deleteDoc(doc(db, "tasks", id));
        fetchTasks(); // Refresh the task list
      } catch (error) {
        console.error("Error deleting task: ", error);
      }
    };

    const handleUpdateTaskStatus = async (id, currentStatus) => {
      const newStatus =
        currentStatus === "complete" ? "incomplete" : "complete";
      try {
        await updateDoc(doc(db, "tasks", id), { status: newStatus });
        fetchTasks(); // Refresh the task list
      } catch (error) {
        console.error("Error updating task status: ", error);
      }
    };

    const handleCreateGroup = async () => {
      if (newGroupName.trim() === "") return;
      try {
        await addDoc(groupsCollectionRef, { name: newGroupName });
        setNewGroupName("");
        fetchGroups(); // Refresh the group list
      } catch (error) {
        console.error("Error creating group: ", error);
      }
    };

    const handleDeleteGroup = async (id) => {
      try {
        await deleteDoc(doc(db, "groups", id));
        fetchGroups(); // Refresh the group list
      } catch (error) {
        console.error("Error deleting group: ", error);
      }
    };

    const handleUpdateGroup = async () => {
      if (editGroupName.trim() === "") return;
      try {
        await updateDoc(doc(db, "groups", editGroupId), {
          name: editGroupName,
        });
        setEditGroupName("");
        setEditGroupId("");
        fetchGroups(); // Refresh the group list
      } catch (error) {
        console.error("Error updating group: ", error);
      }
    };

    const handleEditTask = async () => {
      if (editTask.trim() === "" || editDate === "") return;
      try {
        await updateDoc(doc(db, "tasks", editTaskId), {
          task: editTask,
          date: new Date(editDate).toISOString(),
          group: editTaskGroup,
        });
        setEditTaskId("");
        setEditTask("");
        setEditDate("");
        setEditTaskGroup("");
        fetchTasks(); // Refresh the task list
      } catch (error) {
        console.error("Error updating task: ", error);
      }
    };
