import { useInfiniteQuery } from 'react-query';

import fetchWithError from '@/helpers/fetchWithError';

export default function useIssueCommentsData(issueNumber: string | undefined) {
  const issueCommentsQuery = useInfiniteQuery<IssueComment[], Error>(
    ['issues', issueNumber, 'comments'],
    ({ signal, pageParam = 1 }) => fetchWithError(`/api/issues/${issueNumber}/comments?page=${pageParam}`, { signal }),
    {
      enabled: Boolean(issueNumber),
      getNextPageParam: (lastPage, pages) => {
        if (lastPage.length === 0) return;
        return pages.length + 1;
      },
    }
  );

  return issueCommentsQuery;
}
