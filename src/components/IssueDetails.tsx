import { useParams } from 'react-router-dom';

import CommentsList from '@/components/CommentsList';
import IssueHeader from '@/components/IssueHeader';
import IssueStatus from '@/components/IssueStatus';
import useIssueCommentsData from '@/hooks/useIssueCommentsData';
import useIssueData from '@/hooks/useIssueData';

export default function IssueDetails() {
  const { number } = useParams();
  const issueQuery = useIssueData(number);
  const commentsQuery = useIssueCommentsData(number);

  return (
    <div className='grid w-full gap-4 lg:grid-cols-12'>
      <div className='col-span-12 block'>
        <div className='rounded-md bg-stone-800 p-4'>
          {issueQuery.isLoading ? (
            <p>Loading...</p>
          ) : issueQuery.isError ? (
            <p>{issueQuery.error.message}</p>
          ) : (
            <IssueHeader issue={issueQuery.data} />
          )}
        </div>
      </div>
      <div className='col-span-12 block lg:hidden'>Right Top</div>
      <section className='col-span-12 lg:col-span-8'>
        <div className='rounded-md bg-stone-800 p-4'>
          {commentsQuery.isLoading ? (
            <p>Loading...</p>
          ) : commentsQuery.isError ? (
            <p>{commentsQuery.error.message}</p>
          ) : (
            <CommentsList comments={commentsQuery.data} />
          )}
        </div>
      </section>
      <aside className='hidden lg:col-span-4 lg:block'>
        <div className='rounded-md bg-stone-800 p-4'>
          {issueQuery.isLoading ? (
            <p>Loading...</p>
          ) : issueQuery.isError ? (
            <p>{issueQuery.error.message}</p>
          ) : (
            <IssueStatus issue={issueQuery.data} />
          )}
        </div>
      </aside>
    </div>
  );
}
