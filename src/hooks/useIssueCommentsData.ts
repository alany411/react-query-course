import { useQuery } from 'react-query';

import fetchWithError from '@/helpers/fetchWithError';

export default function useIssueCommentsData(issueNumber: string | undefined) {
  const issueCommentsQuery = useQuery<IssueComment[], Error>(
    ['issues', issueNumber, 'comments'],
    () => {
      return fetchWithError(`/api/issues/${issueNumber}/comments`);
    },
    {
      enabled: Boolean(issueNumber),
    }
  );

  return issueCommentsQuery;
}
