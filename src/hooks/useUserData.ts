import { useQuery } from 'react-query';

import fetchWithError from '@/helpers/fetchWithError';

export default function useUserData(userId: string) {
  const usersData = useQuery<User, Error>(['users', userId], () => fetchWithError(`/api/users/${userId}`), {
    enabled: Boolean(userId),
    staleTime: 1000 * 60 * 1,
  });

  return usersData;
}
