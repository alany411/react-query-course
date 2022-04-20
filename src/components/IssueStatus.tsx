import { useMutation, useQueryClient } from 'react-query';

import StatusSelect from '@/components/StatusSelect';

type IssueStatusProps = {
  issue: Issue | undefined;
};

export default function IssueStatus({ issue }: IssueStatusProps) {
  const queryClient = useQueryClient();
  if (!issue) return null;
  const { status, number } = issue;

  const setStatus = useMutation(
    (status: string) =>
      fetch(`/api/issues/${number}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status }),
      }).then((res) => res.json()),
    {
      onMutate: (status) => {
        const oldStatus = queryClient.getQueryData<Issue>(['issues', number.toString()])?.status;
        queryClient.setQueryData(['issues', number.toString()], (data) => ({
          ...(data as Record<string, unknown>),
          status,
        }));

        return function rollback() {
          queryClient.setQueryData(['issues', number.toString()], (data) => ({
            ...(data as Record<string, unknown>),
            status: oldStatus,
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
    <div className='space-y-4'>
      <div>
        <h3 className='mb-4 text-lg font-semibold tracking-wider'>Status</h3>
        <StatusSelect value={status} onChange={(event) => setStatus.mutate(event.target.value)} noEmptyOption />
      </div>
      <div>
        <h3 className='mb-4 text-lg font-semibold tracking-wider'>Assigned To</h3>
      </div>
      <div>
        <h3 className='mb-4 text-lg font-semibold tracking-wider'>Labels</h3>
      </div>
    </div>
  );
}
