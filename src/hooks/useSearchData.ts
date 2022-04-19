import { useQuery } from 'react-query';

export default function useSearchData(searchValue: string) {
  const searchData = useQuery<Search>(
    ['issues', 'search', searchValue],
    () => fetch(`/api/search/issues?q=${searchValue}`).then((res) => res.json()),
    {
      enabled: Boolean(searchValue),
    }
  );

  return searchData;
}
