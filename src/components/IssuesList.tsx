import { useQuery } from 'react-query';

import IssueItem from '@/components/IssueItem';

type IssuesListProps = {
  labels: Label['id'][];
};

export default function IssuesList({ labels }: IssuesListProps) {
  const issuesQuery = useQuery<Issue[]>(['issues', { labels }], async () => {
    const labelsString = labels.map((label) => `labels[]=${label}`).join('&');
    return fetch(`/api/issues?${labelsString}`).then((res) => res.json());
  });

  return (
    <div className='rounded-md bg-stone-800 p-4'>
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
