import { fetchTasks } from '@/lib/api';
import Link from 'next/link';
import Pagination from './components/Pagination';
import TaskErrorHandler from './components/TaskErrorHandler';
import { TasksProvider } from './context/TasksContext';
import TaskList from './components/TaskList';
import TaskSummary from './components/TaskSummary';

interface HomeProps {
  searchParams: { page?: string; limit?: string };
}

export default async function Home({ searchParams }: HomeProps) {
  const params = await Promise.resolve(searchParams);

  const currentPage = parseInt(params.page ?? '1', 10);
  const limit = parseInt(params.limit ?? '5', 10);

  try {
    // Fetch paginated data
    const result = await fetchTasks(currentPage, limit);

    return (
      <TasksProvider
        initialTasks={result.tasks}
        initialTotalTasks={result.totalTasks}
        initialCompletedTasks={result.completedTasks}
        limit={limit}
      >
        <div className="flex flex-col items-center space-y-10 mt-5">
          <Link href="/tasks/new" className="w-full max-w-[50vw]">
            <button className="flex gap-2 items-center bg-[#1E6F9F] w-full justify-center h-[52px] rounded-lg hover:bg-blue-500 cursor-pointer">
              <p className="text-sm text-[#fff] font-bold">Create Task</p>
              <img src="/assets/add_icon.svg" alt="add-icon" />
            </button>
          </Link>

          <TaskSummary />

          <TaskList />

          {result.totalPages > 1 && (
            <div className="flex w-full justify-end max-w-[50vw]">
              <Pagination />
            </div>
          )}
        </div>
      </TasksProvider>
    );
  } catch (err) {
    console.error('Error fetching tasks:', err);
    return (
      <div className="flex flex-col items-center justify-center h-screen">
        <TaskErrorHandler error="Failed to fetch tasks. Please try again later." />
      </div>
    );
  }
}
