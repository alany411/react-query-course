import { useQuery } from 'react-query';

import fetchWithError from '@/helpers/fetchWithError';

export default function useUserData(userId: string) {
  const usersData = useQuery<User, Error>(
    ['users', userId],
    ({ signal }) => fetchWithError(`/api/users/${userId}`, { signal }),
    {
      enabled: Boolean(userId),
      staleTime: 1000 * 60 * 5,
    }
  );

  return usersData;
}
