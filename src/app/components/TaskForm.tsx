'use client';

import React, { useState, useEffect } from 'react';
import { createTask, updateTask } from '@/lib/api';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import clsx from 'clsx';

interface TaskFormProps {
  task?: {
    id: number;
    title: string;
    color: string;
  };
}

const TaskForm: React.FC<TaskFormProps> = ({ task }) => {
  const [title, setTitle] = useState(task?.title || '');
  const [color, setColor] = useState(task?.color || '');
  const [errors, setErrors] = useState<{ title?: string; color?: string }>({});

  // Sync title and color when task changes
  useEffect(() => {
    if (task) {
      setTitle(task.title || '');
      setColor(task.color || '');
    }
  }, [task]);

  const router = useRouter();

  // List of available colors for the task
  const colors = [
    'red',
    'blue',
    'green',
    'yellow',
    'purple',
    'pink',
    'orange',
    'teal',
    'brown',
    'gray',
  ];

  // Validate form fields dynamically
  const validateField = (name: string, value: string) => {
    const validationErrors: { [key: string]: string } = {};

    if (name === 'title' && !value.trim()) {
      validationErrors.title = 'Title is required.';
    }

    if (name === 'color' && !value) {
      validationErrors.color = 'Color is required.';
    }

    setErrors((prev) => ({ ...prev, ...validationErrors, [name]: validationErrors[name] || '' }));
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Perform validation
    const validationErrors: { title?: string; color?: string } = {};
    if (!title.trim()) validationErrors.title = 'Title is required.';
    if (!color) validationErrors.color = 'Color is required.';

    setErrors(validationErrors);

    if (Object.keys(validationErrors).length > 0) return;

    try {
      if (task) {
        await updateTask(task.id, { title, color });
        toast.success('Task updated successfully!');
      } else {
        await createTask({ title, color });
        toast.success('Task created successfully!');
      }
      // Reset form state only after successful submission
      router.push('/');
    } catch (error) {
      console.error('Error saving task:', error);
      
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-8 rounded-md w-full max-w-[40vw]">
      <div>
        <label htmlFor="title" className="text-[16px] font-semibold text-[#4EA8DE]">
          Title
        </label>
        <input
          id="title"
          type="text"
          value={title}
          onChange={(e) => {
            setTitle(e.target.value);
            validateField('title', e.target.value);
          }}
          className={clsx(
            'w-full input mt-2 p-2 border rounded-md',
            errors.title ? 'border-red-500' : 'border-gray-300'
          )}
          placeholder="Ex. Brush your teeth"
        />
        {errors.title && <p className="text-red-500 text-sm mt-1">{errors.title}</p>}
      </div>

      <div>
        <label className="text-[16px] font-semibold text-[#4EA8DE]">Color</label>
        <div className="flex space-x-2 mt-2">
          {colors.map((col) => (
            <div
              key={col}
              onClick={() => {
                setColor(col);
                validateField('color', col);
              }}
              className={clsx(
                'w-8 h-8 rounded-full cursor-pointer transition-all',
                color === col && 'ring-2 ring-offset-2 ring-blue-500'
              )}
              style={{ backgroundColor: col }}
            ></div>
          ))}
        </div>
        {errors.color && <p className="text-red-500 text-sm mt-1">{errors.color}</p>}
      </div>

      {task ? (
        <button
          type="submit"
          className="flex gap-2 mt-5 items-center bg-[#1E6F9F] w-full justify-center h-[52px] rounded-lg hover:bg-blue-500 cursor-pointer"
        >
          <p className="text-sm text-[#fff] font-bold">Save</p>
          <img src="/assets/save_icon.svg" alt="save_icon" />
        </button>
      ) : (
        <button
          type="submit"
          className="flex gap-2 mt-5 items-center bg-[#1E6F9F] w-full justify-center h-[52px] rounded-lg hover:bg-blue-500 cursor-pointer"
        >
          <p className="text-sm text-[#fff] font-bold">Add Task</p>
          <img src="/assets/add_icon.svg" alt="add-icon" />
        </button>
      )}
    </form>
  );
};

export default TaskForm;
