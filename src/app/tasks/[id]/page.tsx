import { getTaskById } from '@/lib/api';
import TaskForm from '@/app/components/TaskForm';
import TaskErrorHandler from '@/app/components/TaskErrorHandler';

interface EditTaskPageProps {
  params: {
    id: string;
  };
}

export default async function EditTaskPage({ params }: EditTaskPageProps) {
  const taskId = params.id;

  try {
    // Fetch the task details using the ID
    const task = await getTaskById(taskId);

    return (
      <div className="flex flex-col flex-grow items-center mt-[10vh] space-y-16">
        <a href="/" className="w-full max-w-[40vw]">
          <img src="/assets/back-arrow.svg" alt="back-arrow" />
        </a>
        <TaskForm task={task} />
      </div>
    );
  } catch (err) {
    console.error('Error fetching task:', err);

    // Return fallback UI when the fetch fails
    return (
      <div className="flex flex-col items-center justify-center h-screen space-y-8">
        <TaskErrorHandler error="Failed to fetch task. Please try again later." />
      </div>
    );
  }
}
