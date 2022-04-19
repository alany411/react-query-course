import { useQuery, useQueryClient } from 'react-query';

import fetchWithError from '@/helpers/fetchWithError';

export default function useIssuesData(labels: Label['id'][], status: Issue['status']) {
  const queryClient = useQueryClient();
  const issuesQuery = useQuery<Issue[], Error>(['issues', { labels, status }], async ({ signal }) => {
    const labelsString = labels.map((label) => `labels[]=${label}`).join('&');
    const statusString = status ? `&status=${status}` : '';
    const results = await fetchWithError(`/api/issues?${labelsString}${statusString}`, { signal });

    results.forEach((issue: Issue) => {
      queryClient.setQueryData(['issues', issue.number.toString()], issue);
    });

    return results;
  });

  return issuesQuery;
}
