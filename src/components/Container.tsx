import { GoArrowLeft, GoPlus } from 'react-icons/go';
import { Link, useMatch } from 'react-router-dom';

export default function Container({ children }: { children?: React.ReactNode }) {
  const isRootPath = useMatch({ path: '/', end: true });

  return (
    <div>
      <header className='mb-8 bg-stone-800'>
        <div className='mx-auto w-full px-4 py-4 sm:px-6 lg:max-w-screen-xl lg:px-8'>
          <div className='flex items-center justify-between'>
            <h1 className='text-2xl font-semibold uppercase tracking-wider'>
              <Link
                to='/'
                className='rounded-md hover:underline focus:outline-none focus:ring-2 focus:ring-stone-500 focus:ring-offset-2 focus:ring-offset-stone-800'
              >
                Issues Tracker
              </Link>
            </h1>
            {isRootPath ? (
              <Link
                to='/add'
                className='inline-flex cursor-pointer items-center space-x-2 rounded-md border border-transparent bg-green-600 py-2 px-4 shadow-sm hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-stone-500 focus:ring-offset-2 focus:ring-offset-stone-800'
              >
                <GoPlus />
                <span>Add Issue</span>
              </Link>
            ) : (
              <Link
                to='/'
                className='inline-flex cursor-pointer items-center space-x-2 rounded-md border border-transparent bg-stone-600 py-2 px-4 shadow-sm hover:bg-stone-700 focus:outline-none focus:ring-2 focus:ring-stone-500 focus:ring-offset-2 focus:ring-offset-stone-800'
              >
                <GoArrowLeft />
                <span>Back to Issues</span>
              </Link>
            )}
          </div>
        </div>
      </header>
      <main className='mx-auto h-full w-full flex-1 px-4 py-4 sm:px-6 lg:max-w-screen-xl lg:px-8'>{children}</main>
    </div>
  );
}
