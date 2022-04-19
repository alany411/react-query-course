import { useQuery } from 'react-query';

export default function useIssueData(issueNumber: string | undefined) {
  const issueQuery = useQuery<Issue>(
    ['issues', issueNumber],
    () => fetch(`/api/issues/${issueNumber}`).then((res) => res.json()),
    {
      enabled: Boolean(issueNumber),
    }
  );

  return issueQuery;
}
