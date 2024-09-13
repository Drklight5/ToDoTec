import { getTasks } from '../helpers/firebase'; // Asegúrate de que la ruta sea correcta

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
