'use client';

import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import { deleteTask, updateTask } from '@/lib/api';
import clsx from 'clsx';
import { useTasks } from '../context/TasksContext';
import ConfirmModal from '../modals/ConfirmModal';
import toast from 'react-hot-toast';

interface TaskCardProps {
  task: {
    id: number;
    title: string;
    completed: boolean;
    color: string;
  };
}

const TaskCard: React.FC<TaskCardProps> = ({ task }) => {
  const router = useRouter();
  const { removeTask, markTaskComplete } = useTasks();
  const [isModalOpen, setModalOpen] = useState(false); // State to control modal visibility

  // Handle task deletion
  const handleDelete = async () => {
    try {
      await deleteTask(task.id);
      toast.success('Task deleted successfully!');
      setModalOpen(false);
      // Optimistically update: remove the task from UI
      removeTask(task.id);
    } catch (error) {
      console.error('Failed to delete task:', error);
      toast.error('Failed to delete task.');
    }
  };

  // Handle checkbox toggle to update task status
  const handleToggle = async () => {
    const updatedCompleted = !task.completed;
    markTaskComplete(task.id, updatedCompleted); // Optimistically update

    try {
      await updateTask(task.id, { completed: updatedCompleted });
    } catch (error) {
      console.error('Failed to update task:', error);
      markTaskComplete(task.id, task.completed); // Rollback on failure
    }
  };

  // Method to allow navigating to the edit page for non completed task only.
  const handleEditTask = () => {
    if (!task.completed) {
      router.push(`/tasks/${task.id}`);
    }
  };

  return (
    <div className="w-full max-w-[50vw] flex items-center justify-between bg-[#262626] border border-solid border-[#333333] px-5 py-3 rounded-lg">
      <div className="flex gap-5 items-center">
        <input
          type="checkbox"
          checked={task.completed}
          onChange={handleToggle}
          style={{
            borderColor: task?.color,
            backgroundColor: task.completed ? task?.color : 'transparent',
          }}
        />
        <p
          onClick={handleEditTask}
          className={clsx(
            'text-[16px]',
            !task.completed && 'hover:underline hover:cursor-pointer',
            task.completed && 'line-through text-[#808080] cursor-default'
          )}
        >
          {task.title}
        </p>
      </div>

      <img
        src="/assets/delete_icon.svg"
        alt="delete_icon"
        className="cursor-pointer"
        onClick={() => setModalOpen(true)}
      />

      {/* Modal */}
      <ConfirmModal
        isOpen={isModalOpen}
        onClose={() => setModalOpen(false)}
        onConfirm={handleDelete}
        message="Are you sure you want to delete this task?"
      />
    </div>
  );
};

export default TaskCard;
