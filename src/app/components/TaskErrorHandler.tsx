'use client';

import { useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'react-hot-toast';

interface TaskErrorHandlerProps {
  error?: string;
}

export default function TaskErrorHandler({ error }: TaskErrorHandlerProps) {
  const toastDisplayed = useRef(false);
  const router = useRouter();

  useEffect(() => {
    if (error && !toastDisplayed.current) {
      toast.error(error);
      toastDisplayed.current = true;

      // Redirect to home page after a short delay
      setTimeout(() => {
        router.push('/'); // Navigate to the home page
      }, 1000); // Delay of 1 second to allow toast display
    }
  }, [error, router]);

  return null;
}
