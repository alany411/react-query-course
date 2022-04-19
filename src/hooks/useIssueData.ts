import { useQuery } from 'react-query';

import fetchWithError from '@/helpers/fetchWithError';

export default function useIssueData(issueNumber: string | undefined) {
  const issueQuery = useQuery<Issue, Error>(
    ['issues', issueNumber],
    () => fetchWithError(`/api/issues/${issueNumber}`),
    {
      enabled: Boolean(issueNumber),
      staleTime: 1000 * 60 * 1,
    }
  );

  return issueQuery;
}
