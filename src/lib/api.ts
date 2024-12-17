import axios from 'axios';
import toast from 'react-hot-toast';

const BASE_URL = 'http://localhost:3001/tasks';

// Create an Axios instance
const apiClient = axios.create({
  baseURL: BASE_URL,
  headers: { 'Content-Type': 'application/json' },
});

// Fetch all tasks
export const fetchTasks = async (page: number = 1, limit: number = 5) => {
  const response = await apiClient.get(`?page=${page}&limit=${limit}`);
  return response.data; // Return raw data from API
};

// Fetch a single task by ID
export const getTaskById = async (id: string) => {
  const response = await apiClient.get(`${BASE_URL}/${id}`);
  return response.data;
};

// Create a new task
export const createTask = async (data: { title: string; color: string }) => {
  try {
    const response = await apiClient.post('/', data);
    toast.success('Task created successfully!');
    return response.data;
  } catch (error: unknown) {
    toast.error('Failed to create task.');
    throw new Error('Failed to create task: ' + (error as Error).message);
  }
};

// Update a task
export const updateTask = async (
  id: number,
  updates: { completed?: boolean; title?: string; color?: string }
) => {
  try {
    const response = await apiClient.put(`/${id}`, updates);
    return response.data;
  } catch (error: unknown) {
    toast.error('Failed to update task.');
    throw new Error('Failed to update task: ' + (error as Error).message);
  }
};

// Delete a task
export const deleteTask = async (id: number) => {
  try {
    await apiClient.delete(`/${id}`);
    toast.success('Task deleted successfully!');
    return { success: true };
  } catch (error: unknown) {
    toast.error('Failed to delete task.');
    throw new Error('Failed to delete task: ' + (error as Error).message);
  }
};
