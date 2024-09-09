import axios from 'axios';
import { Task } from '../features/taskSlice';

const API_URL = 'http://localhost:8000';

export const createTask = async (task: { title: string; description: string; completed: boolean }) => {
  const response = await axios.post(`${API_URL}/tasks`, task);
  return response.data;
};

export const getTasks = async () => {
  try {
    const response = await axios.get(`${API_URL}/tasks`);
    return response.data as Task[]; 
  } catch (error) {
    console.error("Failed to fetch tasks:", error);
    throw error;
  }
};

export const updateTaskStatus = async (task: { id: number; completed: boolean }) => {
  try {
    const response = await axios.put(`${API_URL}/tasks/${task.id}`, { completed: task.completed });
    return response.data;
  } catch (error) {
    console.error("Failed to update task status:", error);
    throw error;
  }
};
export const deleteTask = async (id: number) => {
  try {
    const response = await axios.delete(`${API_URL}/tasks/${id}`);
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
