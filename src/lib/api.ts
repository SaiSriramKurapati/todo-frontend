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
    return response.data;
  } catch (error: unknown) {
    toast.error('Failed to create task.');
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
  }
};

// Delete a task
export const deleteTask = async (id: number) => {
    await apiClient.delete(`/${id}`);
    return { success: true };
};
