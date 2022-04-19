import { useQuery } from 'react-query';

import fetchWithError from '@/helpers/fetchWithError';

export default function useIssuesData(labels: Label['id'][], status: Issue['status']) {
  const issuesQuery = useQuery<Issue[], Error>(['issues', { labels, status }], ({ signal }) => {
    const labelsString = labels.map((label) => `labels[]=${label}`).join('&');
    const statusString = status ? `&status=${status}` : '';
    return fetchWithError(`/api/issues?${labelsString}${statusString}`, { signal });
  });

  return issuesQuery;
}
