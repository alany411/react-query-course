import { GoComment, GoIssueClosed, GoIssueOpened } from 'react-icons/go';
import { Link } from 'react-router-dom';

import { relativeDate } from '@/helpers/relativeDate';
import useUserData from '@/hooks/useUserData';

type IssueItemProps = {
  assignee: string;
  commentCount: number;
  createdBy: string;
  createdDate: string;
  labels: string[];
  number: number;
  status: string;
  title: string;
};

export default function IssueItem({
  assignee,
  commentCount,
  createdBy,
  createdDate,
  labels,
  number,
  status,
  title,
}: IssueItemProps) {
  const assigneeUser = useUserData(assignee);
  const createdByUser = useUserData(createdBy);

  return (
    <li className='flex items-center justify-between space-x-6 rounded border border-stone-700 bg-stone-900 p-4'>
      <div>
        {status === 'done' || status === 'cancelled' ? (
          <GoIssueClosed className='h-6 w-6 text-red-600' />
        ) : (
          <GoIssueOpened className='h-6 w-6 text-green-600' />
        )}
      </div>
      <div className='flex flex-1 flex-col'>
        <span>
          <Link to={`/issue/${number}`} className='font-semibold tracking-wide hover:underline'>
            {title}
          </Link>
        </span>
        <small className='mb-2 text-neutral-400'>
          #{number} opened {relativeDate(createdDate)}{' '}
          {createdByUser.isSuccess && (
            <>
              by <span className='font-bold tracking-wide'>{createdByUser.data.name}</span>
            </>
          )}
        </small>
        <span className='space-x-2'>
          {labels.map((label) => (
            <span
              key={label}
              className='inline-flex items-center rounded bg-indigo-100 px-2 py-0.5 text-xs font-medium text-indigo-800'
            >
              <svg className='mr-1.5 h-2 w-2 text-indigo-400' fill='currentColor' viewBox='0 0 8 8'>
                <circle cx={4} cy={4} r={3} />
              </svg>
              {label}
            </span>
          ))}
        </span>
      </div>
      {assignee && assigneeUser.isSuccess && (
        <img
          alt={`Assigned to ${assigneeUser.data.name}`}
          src={assigneeUser.data.profilePictureUrl}
          className='inline-block h-8 w-8 rounded-full'
        />
      )}
      <span className='flex items-center text-neutral-400'>
        {commentCount > 0 && (
          <>
            <GoComment className='mr-2' /> {commentCount}
          </>
        )}
      </span>
    </li>
  );
}
