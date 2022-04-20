import { Menu } from '@headlessui/react';
import cn from 'classnames';
import { GoGear, GoPrimitiveDot } from 'react-icons/go';
import { useMutation, useQueryClient } from 'react-query';

import LabelItem from '@/components/LabelItem';
import useLabelsData from '@/hooks/useLabelsData';

type IssueLabelsProps = {
  issue: Issue | undefined;
};

export default function IssueLabels({ issue }: IssueLabelsProps) {
  const queryClient = useQueryClient();
  if (!issue) return null;
  const { labels, number } = issue;

  const labelsQuery = useLabelsData();

  const setLabels = useMutation(
    async (labelId: string) => {
      const newLabels = labels.includes(labelId) ? labels.filter((label) => label !== labelId) : [...labels, labelId];
      const res = await fetch(`/api/issues/${number}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ labels: newLabels }),
      });
      return await res.json();
    },
    {
      onMutate: (labelId) => {
        const oldLabels = queryClient.getQueryData<Issue>(['issues', number.toString()])?.labels as string[];
        const newLabels = oldLabels?.includes(labelId)
          ? oldLabels.filter((label) => label !== labelId)
          : [...oldLabels, labelId];

        queryClient.setQueryData(['issues', number.toString()], (data) => ({
          ...(data as Record<string, unknown>),
          labels: newLabels,
        }));

        return function rollback() {
          queryClient.setQueryData<Record<string, string[]>>(['issues', number.toString()], (data) => {
            const rollbackLabels = oldLabels.includes(labelId)
              ? [...data!.labels, labelId]
              : data!.labels.filter((label) => label !== labelId);

            return {
              ...(data as Record<string, unknown>),
              labels: rollbackLabels,
            };
          });
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
        <h3 className='mb-2 text-lg font-semibold tracking-wider'>Labels</h3>
        <Menu as='div' className='relative'>
          {({ open }) => (
            <>
              <Menu.Button className='rounded-full focus:border-stone-900 focus:outline-none focus:ring-2 focus:ring-stone-500 focus:ring-offset-2 focus:ring-offset-stone-800'>
                <span className='sr-only'>Edit Labels</span>
                <GoGear className='text-lg' />
              </Menu.Button>
              {!labelsQuery.isLoading && open && (
                <Menu.Items className='absolute left-0 mt-6 inline-flex w-48 origin-top-right flex-col rounded-md border border-stone-700 bg-stone-900 py-2 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none'>
                  {labelsQuery.data?.map((label) => {
                    if (label)
                      return (
                        <Menu.Item key={label.id}>
                          {({ active }) => (
                            <div
                              className={cn('inline-flex cursor-pointer items-center space-x-2 px-2 py-1', {
                                'bg-blue-500': active,
                              })}
                              onClick={() => setLabels.mutate(label.id)}
                            >
                              <GoPrimitiveDot
                                className={cn({
                                  'rounded-full bg-red-100 text-red-800': label.color === 'red',
                                  'rounded-full bg-orange-100 text-orange-800': label.color === 'orange',
                                  'rounded-full bg-blue-100 text-blue-800': label.color === 'blue',
                                  'rounded-full bg-cyan-100 text-cyan-800': label.color === 'cyan',
                                  'rounded-full bg-lime-100 text-lime-800': label.color === 'lime',
                                  'rounded-full bg-stone-100 text-stone-800': label.color === 'white',
                                  'rounded-full bg-purple-100 text-purple-800': label.color === 'rebeccapurple',
                                })}
                              />
                              <span className='font-bold tracking-wide'>{label.name}</span>
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
      <span className='space-x-2'>
        {labels.map((label) => (
          <LabelItem key={label} label={label} />
        ))}
      </span>
    </div>
  );
}
