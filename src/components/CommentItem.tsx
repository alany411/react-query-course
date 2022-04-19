import { relativeDate } from '@/helpers/relativeDate';
import useUserData from '@/hooks/useUserData';

type CommentItemProps = {
  comment: IssueComment;
};

export default function CommentItem({ comment }: CommentItemProps) {
  const { comment: text, createdBy, createdDate } = comment;
  const createdByUser = useUserData(createdBy);

  return (
    <li className='flex flex-col space-y-4 rounded border border-stone-700 bg-stone-900 p-4'>
      {createdByUser.isLoading ? (
        <p>Loading...</p>
      ) : createdByUser.isError ? (
        <p>{createdByUser.error.message}</p>
      ) : (
        <>
          <div className='flex w-full items-center space-x-4'>
            <img
              alt={`Comment by ${createdByUser.data?.name}`}
              src={createdByUser.data?.profilePictureUrl}
              className='inline-block h-10 w-10 rounded-full'
            />

            <span className='inline-flex flex-col'>
              <span className='font-semibold tracking-wide'>{createdByUser.data?.name}</span>
              <span className='text-xs text-neutral-400'>{relativeDate(createdDate)}</span>
            </span>
          </div>
          <div>{text}</div>
        </>
      )}
    </li>
  );
}
