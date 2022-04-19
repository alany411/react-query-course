import { useQuery } from 'react-query';

export default function useLabelsData() {
  const labelsQuery = useQuery<Label[]>(['labels'], () => fetch('/api/labels').then((res) => res.json()), {
    staleTime: 1000 * 60 * 60,
  });

  return labelsQuery;
}
