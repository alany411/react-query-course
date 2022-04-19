import cn from 'classnames';
import { GoIssueClosed, GoIssueOpened } from 'react-icons/go';

import { possibleStatus } from '@/helpers/defaultData';
import { relativeDate } from '@/helpers/relativeDate';
import useUserData from '@/hooks/useUserData';

type IssueHeaderProps = {
  isLoading: boolean;
  issue: Issue | undefined;
};

export default function IssueHeader({ isLoading, issue }: IssueHeaderProps) {
  if (isLoading)
    return (
      <div className='rounded-md bg-stone-800 p-4'>
        <p>Loading...</p>
      </div>
    );
  if (!issue) return null;

  const { createdBy, createdDate, comments, number, status, title } = issue;
  const statusObject = possibleStatus.find((pStatus) => pStatus.id === status) || { id: 'todo', label: 'Todo' };
  const createdByUser = useUserData(createdBy);

  return (
    <div className='rounded-md bg-stone-800 p-4'>
      <h2 className='mb-4 text-xl font-semibold tracking-wider'>
        <span>{title}</span> <span className='text-neutral-400'>#{number}</span>
      </h2>
      <div className='flex items-center space-x-4'>
        <span
          className={cn('inline-flex items-center space-x-2 rounded-full px-2 py-0.5 text-white', {
            'bg-red-600': status === 'done' || status === 'cancelled',
            'bg-green-600': !(status === 'done' || status === 'cancelled'),
          })}
        >
          {status === 'done' || status === 'cancelled' ? (
            <GoIssueClosed className='h-5 w-5' />
          ) : (
            <GoIssueOpened className='h-5 w-5' />
          )}
          <span>{statusObject.label}</span>
        </span>
        <span className='text-neutral-400'>
          <span className='font-bold tracking-wide'>{createdByUser.data?.name}</span> opened this issue{' '}
          {relativeDate(createdDate)} - {comments.length} comments
        </span>
      </div>
    </div>
  );
}
