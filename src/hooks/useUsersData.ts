import { useQuery } from 'react-query';

import fetchWithError from '@/helpers/fetchWithError';

export default function useUsersData() {
  const usersData = useQuery<User[], Error>(['users'], ({ signal }) => fetchWithError('/api/users', { signal }), {
    staleTime: 1000 * 60 * 5,
  });

  return usersData;
}
