'use client';
import { useTasks } from '../context/TasksContext';

const TaskSummary = () => {
  const { totalTasks, completedTasks } = useTasks();

  return (
    <section className="flex justify-between w-full max-w-[50vw] items-center">
      <div className="flex gap-2 items-center">
        <p className="text-sm xl:text-[16px] font-bold text-[#4EA8DE]">Tasks</p>
        <div className="px-1.5 py-1.5 text-xs rounded-full bg-[#333333] flex justify-center items-center min-w-[1.5rem] leading-none">
          {totalTasks}
        </div>
      </div>

      <div className="flex gap-2 items-center">
        <p className="text-sm xl:text-[16px] font-bold text-[#8284FA]">Completed</p>
        <div className="px-1.5 py-1.5 text-xs rounded-full bg-[#333333] flex justify-center items-center min-w-[1.5rem] leading-none">
          {completedTasks} of {totalTasks}
        </div>
      </div>
    </section>
  );
};

export default TaskSummary;
