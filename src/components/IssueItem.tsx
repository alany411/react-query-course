import { GoComment, GoIssueClosed, GoIssueOpened } from 'react-icons/go';
import { Link } from 'react-router-dom';

import { relativeDate } from '@/helpers/relativeDate';

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
  return (
    <li>
      <div>
        {status === 'done' || status === 'cancelled' ? (
          <GoIssueClosed className='text-red-600' />
        ) : (
          <GoIssueOpened className='text-green-600' />
        )}
      </div>
      <div>
        <span>
          <Link to={`/issue/${number}`}>{title}</Link>
          {labels.map((label) => (
            <span key={label}>{label}</span>
          ))}
        </span>
        <small>
          #{number} opened {relativeDate(createdDate)} by {createdBy}
        </small>
      </div>
      {assignee && <div>{assignee}</div>}
      <span>
        {commentCount > 0 && (
          <>
            <GoComment /> {commentCount}
          </>
        )}
      </span>
    </li>
  );
}
