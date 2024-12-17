'use client';

import { useTasks } from '../context/TasksContext';
import TaskCard from './TaskCard';

const TaskList = () => {
  const { tasks } = useTasks();

  return (
    <section className="flex flex-col gap-4 w-full max-w-[50vw] border-t border-solid border-[#333333] flex-grow overflow-scroll mt-5 rounded-lg">
      {!!tasks?.length ? (
        tasks.map((task) => <TaskCard key={task.id} task={task} />)
      ) : (
        <div className="flex flex-col mt-[10vh] items-center rounded-lg ">
          <img src="/assets/no-data.svg" alt="no-data-template-icon" />
          <p className="text-[16px] text-[#808080] font-bold">You don't have any tasks yet.</p>
          <p className="text-[16px] text-[#808080] mt-2">
            Create tasks and organize your to-do items.
          </p>
        </div>
      )}
    </section>
  );
};

export default TaskList;
