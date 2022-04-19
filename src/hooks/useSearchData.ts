import { useQuery } from 'react-query';

import fetchWithError from '@/helpers/fetchWithError';

export default function useSearchData(searchValue: string) {
  const searchData = useQuery<Search, Error>(
    ['issues', 'search', searchValue],
    () => fetchWithError(`/api/search/issues?q=${searchValue}`),
    {
      enabled: Boolean(searchValue),
    }
  );

  return searchData;
}
