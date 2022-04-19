import { useQuery } from 'react-query';

import fetchWithError from '@/helpers/fetchWithError';

export default function useSearchData(searchValue: string) {
  const searchData = useQuery<Search, Error>(
    ['issues', 'search', searchValue],
    ({ signal }) => fetchWithError(`/api/search/issues?q=${searchValue}`, { signal }),
    {
      enabled: Boolean(searchValue),
    }
  );

  return searchData;
}
