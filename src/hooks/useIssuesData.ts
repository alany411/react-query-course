import { useQuery, useQueryClient } from 'react-query';

import fetchWithError from '@/helpers/fetchWithError';

export default function useIssuesData(labels: Label['id'][], status: Issue['status'], pageNum: number) {
  const queryClient = useQueryClient();
  const issuesQuery = useQuery<Issue[], Error>(
    ['issues', { labels, status, pageNum }],
    async ({ signal }) => {
      const labelsString = labels.map((label) => `labels[]=${label}`).join('&');
      const statusString = status ? `&status=${status}` : '';
      const paginationString = pageNum ? `&page=${pageNum}` : '';

      const results = await fetchWithError(`/api/issues?${labelsString}${statusString}${paginationString}`, { signal });

      results.forEach((issue: Issue) => {
        queryClient.setQueryData(['issues', issue.number.toString()], issue);
      });

      return results;
    },
    {
      keepPreviousData: true,
    }
  );

  return issuesQuery;
}
