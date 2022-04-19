import { useQuery } from 'react-query';

import fetchWithError from '@/helpers/fetchWithError';

export default function useIssueData(issueNumber: string | undefined) {
  const issueQuery = useQuery<Issue, Error>(
    ['issues', issueNumber],
    ({ signal }) => fetchWithError(`/api/issues/${issueNumber}`, { signal }),
    {
      enabled: Boolean(issueNumber),
    }
  );

  return issueQuery;
}
