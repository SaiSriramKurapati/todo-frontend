import TaskForm from '@/app/components/TaskForm';

export default function TaskPage() {
  return (
    <div className="flex flex-col items-center mt-[10vh] space-y-16 h-full">
      <a href="/" className="w-full max-w-[40vw] ">
        <img src="/assets/back-arrow.svg" alt="back-arrow" />
      </a>

      <TaskForm />
    </div>
  );
}
