import { useParams } from 'react-router-dom';

import CommentsList from '@/components/CommentsList';
import IssueHeader from '@/components/IssueHeader';
import useIssueCommentsData from '@/hooks/useIssueCommentsData';
import useIssueData from '@/hooks/useIssueData';

export default function IssueDetails() {
  const { number } = useParams();
  const issueQuery = useIssueData(number);
  const commentsQuery = useIssueCommentsData(number);

  return (
    <div className='grid w-full gap-4 lg:grid-cols-12'>
      <div className='col-span-12 block'>
        <IssueHeader isLoading={issueQuery.isLoading} issue={issueQuery.data} />
      </div>
      <div className='col-span-12 block lg:hidden'>Right Top</div>
      <section className='col-span-12 lg:col-span-8'>
        <CommentsList isLoading={commentsQuery.isLoading} comments={commentsQuery.data} />
      </section>
      <aside className='hidden lg:col-span-4 lg:block'>Right</aside>
    </div>
  );
}
