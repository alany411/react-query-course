import { Menu } from '@headlessui/react';
import cn from 'classnames';
import { GoGear } from 'react-icons/go';
import { useMutation, useQueryClient } from 'react-query';

import useUserData from '@/hooks/useUserData';
import useUsersData from '@/hooks/useUsersData';

type IssueAssignmentProps = {
  issue: Issue | undefined;
};

export default function IssueAssignment({ issue }: IssueAssignmentProps) {
  const queryClient = useQueryClient();
  if (!issue) return null;
  const { assignee, number } = issue;

  const assigneeUser = useUserData(assignee);
  const usersQuery = useUsersData();

  const setAssignment = useMutation(
    (assignee: string) =>
      fetch(`/api/issues/${number}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ assignee }),
      }).then((res) => res.json()),
    {
      onMutate: (assignee) => {
        const oldAssignee = queryClient.getQueryData<Issue>(['issues', number.toString()])?.assignee;
        queryClient.setQueryData(['issues', number.toString()], (data) => ({
          ...(data as Record<string, unknown>),
          assignee,
        }));

        return function rollback() {
          queryClient.setQueryData(['issues', number.toString()], (data) => ({
            ...(data as Record<string, unknown>),
            assignee: oldAssignee,
          }));
        };
      },
      onError: (rollback: VoidFunction) => {
        rollback();
      },
      onSettled: () => {
        queryClient.invalidateQueries(['issues', number.toString()], { exact: true });
      },
    }
  );

  return (
    <div>
      <div className='flex items-center space-x-4'>
        <h3 className='mb-2 text-lg font-semibold tracking-wider'>Assignment</h3>
        <Menu as='div' className='relative'>
          {({ open }) => (
            <>
              <Menu.Button className='rounded-full focus:border-stone-900 focus:outline-none focus:ring-2 focus:ring-stone-500 focus:ring-offset-2 focus:ring-offset-stone-800'>
                <span className='sr-only'>Edit Assignment</span>
                <GoGear className='text-lg' />
              </Menu.Button>
              {!usersQuery.isLoading && open && (
                <Menu.Items className='absolute left-0 mt-6 inline-flex w-48 origin-top-right flex-col rounded-md border border-stone-700 bg-stone-900 py-2 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none'>
                  {usersQuery.data?.map((user) => {
                    if (user)
                      return (
                        <Menu.Item key={user.id}>
                          {({ active }) => (
                            <div
                              className={cn('inline-flex cursor-pointer items-center space-x-4 px-2 py-1', {
                                'bg-blue-500': active,
                              })}
                              onClick={() => setAssignment.mutate(user.id)}
                            >
                              <img
                                alt={`${user.name}`}
                                src={user.profilePictureUrl}
                                className='inline-block h-8 w-8 rounded-full'
                              />
                              <span className='font-bold tracking-wide'>{user.name}</span>
                            </div>
                          )}
                        </Menu.Item>
                      );
                  })}
                </Menu.Items>
              )}
            </>
          )}
        </Menu>
      </div>
      <div className='h-8 w-8'>
        {assigneeUser.isLoading ? (
          <div className='inline-block h-8 w-8 rounded-full bg-neutral-600' />
        ) : assigneeUser.isError ? (
          <p>{assigneeUser.error.message}</p>
        ) : (
          <img
            alt={`Assigned to ${assigneeUser.data?.name}`}
            src={assigneeUser.data?.profilePictureUrl}
            className='inline-block h-8 w-8 rounded-full'
          />
        )}
      </div>
    </div>
  );
}
