import { useQuery } from 'react-query';

import { defaultLabels } from '@/helpers/defaultData';
import fetchWithError from '@/helpers/fetchWithError';

export default function useLabelsData() {
  const labelsQuery = useQuery<Label[], Error>(['labels'], ({ signal }) => fetchWithError('/api/labels', { signal }), {
    staleTime: 1000 * 60 * 60,
    placeholderData: defaultLabels,
  });

  return labelsQuery;
}
