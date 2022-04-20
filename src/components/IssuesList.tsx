import cn from 'classnames';
import { useState } from 'react';

import IssueItem from '@/components/IssueItem';
import Loader from '@/components/Loader';
import useIssuesData from '@/hooks/useIssuesData';
import useSearchData from '@/hooks/useSearchData';

type IssuesListProps = {
  labels: Label['id'][];
  status: Issue['status'];
  pageNum: number;
  setPageNum: (pageNum: number) => void;
};

export default function IssuesList({ labels, status, pageNum, setPageNum }: IssuesListProps) {
  const [searchValue, setSearchValue] = useState('');
  const issuesQuery = useIssuesData(labels, status, pageNum);
  const searchQuery = useSearchData(searchValue);

  return (
    <div className='rounded-md bg-stone-800 p-4'>
      <h2 className='mb-2 inline-flex items-center space-x-4 text-xl font-semibold tracking-wider'>
        <span>Issues List</span>
        {issuesQuery.isFetching && <Loader />}
      </h2>
      <form
        onSubmit={(event) => {
          event.preventDefault();

          const target = event.target as typeof event.target & {
            search: { value: string };
          };

          setSearchValue(target.search.value);
        }}
      >
        <label htmlFor='search' className='sr-only'>
          Search Issues
        </label>
        <input
          id='search'
          name='search'
          type='search'
          required
          className='w-full rounded-md border border-stone-700 bg-stone-900 px-3 py-2 placeholder-neutral-400 focus:border-stone-900 focus:outline-none focus:ring-2 focus:ring-stone-500 focus:ring-offset-2 focus:ring-offset-stone-800'
          placeholder='Search issues'
          onChange={(event) => {
            if (event.target.value.length === 0) {
              setSearchValue('');
            }
          }}
        />
      </form>
      {issuesQuery.isLoading ? (
        <p className='mt-4'>Loading...</p>
      ) : issuesQuery.isError ? (
        <p className='mt-4'>{issuesQuery.error.message}</p>
      ) : searchQuery.fetchStatus === 'idle' && searchQuery.isLoading === true ? (
        <div className='space-y-4'>
          <ul
            className={cn('space-y-2', {
              'mt-4': issuesQuery.data.length !== 0,
              'mt-0': issuesQuery.data.length === 0,
            })}
          >
            {issuesQuery.data?.map((issue) => (
              <IssueItem
                key={issue.id}
                assignee={issue.assignee}
                commentCount={issue.comments.length}
                createdBy={issue.createdBy}
                createdDate={issue.createdDate}
                labels={issue.labels}
                number={issue.number}
                status={issue.status}
                title={issue.title}
              />
            ))}
          </ul>
          <nav className='flex items-center' aria-label='Pagination'>
            <div className='flex flex-1 justify-between'>
              <button
                onClick={() => {
                  if (pageNum - 1 > 0) {
                    setPageNum(pageNum - 1);
                  }
                }}
                disabled={pageNum === 1}
                className={cn(
                  'cursor-pointer rounded-md border border-transparent bg-green-600 py-2 px-4 shadow-sm hover:bg-green-700 focus:border-stone-900 focus:outline-none focus:ring-2 focus:ring-stone-500 focus:ring-offset-2 focus:ring-offset-stone-800',
                  {
                    'cursor-not-allowed opacity-50': pageNum === 1,
                  }
                )}
              >
                Previous
              </button>
              <p className='inline-flex items-center font-bold tracking-wider'>
                {issuesQuery.isFetching ? <Loader /> : <span>Page {pageNum}</span>}
              </p>
              <button
                onClick={() => {
                  if (issuesQuery.data.length !== 0 && !issuesQuery.isPreviousData) {
                    setPageNum(pageNum + 1);
                  }
                }}
                disabled={issuesQuery.data.length === 0 || issuesQuery.isPreviousData}
                className={cn(
                  'cursor-pointer rounded-md border border-transparent bg-green-600 py-2 px-4 shadow-sm hover:bg-green-700 focus:border-stone-900 focus:outline-none focus:ring-2 focus:ring-stone-500 focus:ring-offset-2 focus:ring-offset-stone-800',
                  {
                    'cursor-not-allowed opacity-50': issuesQuery.data.length === 0 || issuesQuery.isPreviousData,
                  }
                )}
              >
                Next
              </button>
            </div>
          </nav>
        </div>
      ) : (
        <>
          {searchQuery.isLoading ? (
            <p className='mt-4'>Loading...</p>
          ) : searchQuery.isError ? (
            <p className='mt-4'>{searchQuery.error.message}</p>
          ) : (
            <>
              <p
                className={cn('ml-1 mt-4 text-sm italic text-neutral-400', {
                  'mb-2': searchQuery.data?.items.length !== 0,
                })}
              >
                {searchQuery.data?.count} results for <span className='font-bold'>{searchValue}</span>
              </p>
              <ul className='space-y-2'>
                {searchQuery.data?.items.map((issue) => (
                  <IssueItem
                    key={issue.id}
                    assignee={issue.assignee}
                    commentCount={issue.comments.length}
                    createdBy={issue.createdBy}
                    createdDate={issue.createdDate}
                    labels={issue.labels}
                    number={issue.number}
                    status={issue.status}
                    title={issue.title}
                  />
                ))}
              </ul>
            </>
          )}
        </>
      )}
    </div>
  );
}
