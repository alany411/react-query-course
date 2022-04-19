import { GoComment, GoIssueClosed, GoIssueOpened } from 'react-icons/go';
import { useQueryClient } from 'react-query';
import { Link } from 'react-router-dom';

import LabelItem from '@/components/LabelItem';
import fetchWithError from '@/helpers/fetchWithError';
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
  const queryClient = useQueryClient();
  const assigneeUser = useUserData(assignee);
  const createdByUser = useUserData(createdBy);

  return (
    <li
      className='flex items-center justify-between space-x-6 rounded border border-stone-700 bg-stone-900 p-4'
      onMouseEnter={() => {
        queryClient.prefetchQuery(['issues', number.toString()], () => fetchWithError(`/api/issues/${number}`));
        queryClient.prefetchQuery(['issues', number.toString(), 'comments'], () =>
          fetchWithError(`/api/issues/${number}/comments`)
        );
      }}
    >
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
              by <span className='font-bold tracking-wide'>{createdByUser.data?.name}</span>
            </>
          )}
        </small>
        <span className='space-x-2'>
          {labels.map((label) => (
            <LabelItem key={label} label={label} />
          ))}
        </span>
      </div>
      <div className='h-8 w-8'>
        {assignee && assigneeUser.isSuccess && (
          <img
            alt={`Assigned to ${assigneeUser.data?.name}`}
            src={assigneeUser.data?.profilePictureUrl}
            className='inline-block h-8 w-8 rounded-full'
          />
        )}
      </div>
      <span className='flex items-center text-neutral-400'>
        <GoComment className='mr-2' /> {commentCount > 0 ? commentCount : '0'}
      </span>
    </li>
  );
}
