import { useQuery } from 'react-query';

import fetchWithError from '@/helpers/fetchWithError';

export default function useIssuesData(labels: Label['id'][]) {
  const issuesQuery = useQuery<Issue[], Error>(['issues', { labels }], ({ signal }) => {
    const labelsString = labels.map((label) => `labels[]=${label}`).join('&');
    return fetchWithError(`/api/issues?${labelsString}`, { signal });
  });

  return issuesQuery;
}
