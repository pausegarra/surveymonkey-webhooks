import './globals.css';
import '@sweetalert2/theme-dark/dark.min.css';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
};

export default function RootLayout ({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className='bg-black'>
        <div className="container mx-auto py-5">
          {children}
        </div>
        <footer className='text-center text-primary mt-9'>
          developed by <br />
          pau<strong>segarra</strong>
        </footer>
      </body>
    </html>
  );
}
