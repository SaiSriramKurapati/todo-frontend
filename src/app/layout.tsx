import { Toaster } from 'react-hot-toast';
import Header from './components/Header';
import './globals.css'; // Add your global styles

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="h-full">
      <body className="text-white h-full flex flex-col overflow-hidden">
        <Toaster position="top-right" />
        <Header />
        <main className="flex-grow bg-gray-900 w-full flex flex-col">{children}</main>
      </body>
    </html>
  );
}
