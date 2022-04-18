import { useQuery } from 'react-query';

export default function useUserData(userId: string) {
  const usersData = useQuery<User>(['users', userId], () => fetch(`/api/users/${userId}`).then((res) => res.json()));

  return usersData;
}
