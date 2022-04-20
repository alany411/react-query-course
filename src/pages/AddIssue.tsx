import cn from 'classnames';
import { useMutation, useQueryClient } from 'react-query';
import { useNavigate } from 'react-router-dom';

type IssueBodyProps = {
  comment: string;
  title: string;
};

export default function AddIssue() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const addIssue = useMutation(
    (issueBody: IssueBodyProps) =>
      fetch('/api/issues', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(issueBody),
      }).then((res) => res.json()),
    {
      onSuccess: (data) => {
        queryClient.invalidateQueries(['issues'], { exact: true });
        const { number } = data as unknown as Issue;
        queryClient.setQueryData(['issue', number.toString()], data);
        navigate(`/issue/${number}`);
      },
    }
  );

  return (
    <div className='mx-auto w-full max-w-screen-md rounded-md bg-stone-800 p-4'>
      <h2 className='mb-4 text-xl font-semibold tracking-wider'>Add Issue</h2>
      <form
        onSubmit={(event) => {
          event.preventDefault();
          if (addIssue.isLoading) return;

          const target = event.target as typeof event.target & {
            comment: { value: string };
            title: { value: string };
          };

          addIssue.mutate({
            comment: target.comment.value,
            title: target.title.value,
          });
        }}
        className='flex flex-col'
      >
        <label htmlFor='title' className='sr-only'>
          Title
        </label>
        <input
          id='title'
          name='title'
          type='text'
          required
          className='mb-4 w-full rounded-md border border-stone-700 bg-stone-900 px-3 py-2 placeholder-neutral-400 focus:border-stone-900 focus:outline-none focus:ring-2 focus:ring-stone-500 focus:ring-offset-2 focus:ring-offset-stone-800'
          placeholder='Title'
        />
        <label htmlFor='comment' className='sr-only'>
          Comment
        </label>
        <textarea
          id='comment'
          name='comment'
          className='mb-4 w-full rounded-md border border-stone-700 bg-stone-900 px-3 py-2 placeholder-neutral-400 focus:border-stone-900 focus:outline-none focus:ring-2 focus:ring-stone-500 focus:ring-offset-2 focus:ring-offset-stone-800'
          placeholder='Comment'
          rows={7}
        />
        <div className='flex items-center justify-end'>
          <button
            type='submit'
            disabled={addIssue.isLoading}
            className={cn(
              'cursor-pointer rounded-md border border-transparent bg-green-600 py-2 px-4 shadow-sm hover:bg-green-700',
              {
                'cursor-not-allowed opacity-50': addIssue.isLoading,
              }
            )}
          >
            {addIssue.isLoading ? 'Adding Issue...' : 'Add Issue'}
          </button>
        </div>
      </form>
    </div>
  );
}
