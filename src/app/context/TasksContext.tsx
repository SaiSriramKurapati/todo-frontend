'use client';

import { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { fetchTasks as fetchTasksAPI } from '@/lib/api';

interface Task {
  id: number;
  title: string;
  completed: boolean;
  color: string;
}

interface TasksContextType {
  tasks: Task[];
  currentPage: number;
  totalPages: number;
  totalTasks: number;
  completedTasks: number;
  limit: number;
  setTasks: (tasks: Task[]) => void;
  removeTask: (id: number) => void;
  setCurrentPage: (page: number) => void;
  markTaskComplete: (id: number, completed: boolean) => void;
}

const TasksContext = createContext<TasksContextType | undefined>(undefined);

export const TasksProvider = ({
  children,
  initialTasks,
  initialTotalTasks,
  initialCompletedTasks,
  limit,
}: {
  children: ReactNode;
  initialTasks: Task[];
  initialTotalTasks: number;
  initialCompletedTasks: number;
  limit: number;
}) => {
  const [tasks, setTasks] = useState<Task[]>(initialTasks);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalTasks, setTotalTasks] = useState<number>(initialTotalTasks);
  const [completedTasks, setCompletedTasks] = useState<number>(initialCompletedTasks);
  const totalPages = Math.ceil(totalTasks / limit);

  // Method to fetch tasks dynamically
  const fetchTasks = async (page: number) => {
    try {
      const result = await fetchTasksAPI(page, limit);
      setTasks(result.tasks);
      setTotalTasks(result.totalTasks);
      setCompletedTasks(result.completedTasks);
    } catch (error) {
      console.error('Failed to fetch tasks:', error);
    }
  };

  // Fetch tasks when currentPage changes
  useEffect(() => {
    fetchTasks(currentPage);
  }, [currentPage]);

  // Method to remove a task optmisitically on the UI
  const removeTask = (id: number) => {
    const taskToRemove = tasks.find((task) => task.id === id);
    if (taskToRemove?.completed) {
      setCompletedTasks((prev) => prev - 1);
    }
    setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id));
    setTotalTasks((prevTotal) => prevTotal - 1);
  };

  // Method to mark the status of a task complete optimistically.
  const markTaskComplete = (id: number, completed: boolean) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) => (task.id === id ? { ...task, completed } : task))
    );
    setCompletedTasks((prev) => (completed ? prev + 1 : prev - 1));
  };

  return (
    <TasksContext.Provider
      value={{
        tasks,
        currentPage,
        totalPages,
        totalTasks,
        completedTasks,
        limit,
        setTasks,
        removeTask,
        setCurrentPage,
        markTaskComplete,
      }}
    >
      {children}
    </TasksContext.Provider>
  );
};

export const useTasks = () => {
  const context = useContext(TasksContext);
  if (!context) {
    throw new Error('useTasks must be used within a TasksProvider');
  }
  return context;
};
