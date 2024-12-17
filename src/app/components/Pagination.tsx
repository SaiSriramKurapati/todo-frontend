'use client';

import { useRouter, useSearchParams } from 'next/navigation';

import clsx from 'clsx';
import { useTasks } from '../context/TasksContext';

export default function Pagination() {
  const { currentPage, totalPages, setCurrentPage } = useTasks();
  const router = useRouter();
  const searchParams = useSearchParams();

  // Method to handle Page Change
  const handlePageChange = (page: number) => {
    if (page < 1 || page > totalPages) return;

    setCurrentPage(page);
    const params = new URLSearchParams(searchParams);
    params.set('page', String(page));
    router.push(`?${params.toString()}`, { scroll: false });
  };

  return (
    <div className="flex items-center gap-4 mt-5">
      <button
        onClick={() => handlePageChange(currentPage - 1)}
        className={clsx(
          'px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-700',
          currentPage === 1 && 'opacity-50 pointer-events-none'
        )}
        disabled={currentPage === 1}
      >
        Previous
      </button>
      <span className="text-sm font-bold text-white">
        Page {currentPage} of {totalPages}
      </span>
      <button
        onClick={() => handlePageChange(currentPage + 1)}
        className={clsx(
          'px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-700',
          currentPage === totalPages && 'opacity-50 pointer-events-none'
        )}
        disabled={currentPage === totalPages}
      >
        Next
      </button>
    </div>
  );
}
