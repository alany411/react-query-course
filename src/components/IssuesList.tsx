import { useQuery } from 'react-query';

import IssueItem from '@/components/IssueItem';

export default function IssuesList() {
  const issuesQuery = useQuery<Issue[]>(['issues'], () => fetch('/api/issues').then((res) => res.json()));

  return (
    <div>
      <h2 className='mb-4 text-xl font-semibold tracking-wider'>Issues List</h2>
      {issuesQuery.isLoading ? (
        <p>Loading...</p>
      ) : (
        <ul className='space-y-2'>
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
      )}
    </div>
  );
}
