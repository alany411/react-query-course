import CommentItem from '@/components/CommentItem';

type CommentsListProps = {
  isLoading: boolean;
  comments: IssueComment[] | undefined;
};

export default function CommentsList({ isLoading, comments }: CommentsListProps) {
  if (isLoading)
    return (
      <div className='rounded-md bg-stone-800 p-4'>
        <p>Loading...</p>
      </div>
    );
  if (!comments) return null;

  return (
    <ul className='space-y-2 rounded-md bg-stone-800 p-4'>
      {comments.map((comment) => (
        <CommentItem key={comment.id} comment={comment} />
      ))}
    </ul>
  );
}
