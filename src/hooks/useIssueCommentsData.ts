import { useQuery } from 'react-query';

export default function useIssueCommentsData(issueNumber: string | undefined) {
  const issueCommentsQuery = useQuery<IssueComment[]>(
    ['issues', issueNumber, 'comments'],
    async () => {
      const res = await fetch(`/api/issues/${issueNumber}/comments`);
      return await res.json();
    },
    {
      enabled: Boolean(issueNumber),
    }
  );

  return issueCommentsQuery;
}
