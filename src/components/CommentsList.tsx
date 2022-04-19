import CommentItem from '@/components/CommentItem';

type CommentsListProps = {
  comments: IssueComment[] | undefined;
};

export default function CommentsList({ comments }: CommentsListProps) {
  if (!comments) return null;

  return (
    <ul className='space-y-2'>
      {comments.map((comment) => (
        <CommentItem key={comment.id} comment={comment} />
      ))}
    </ul>
  );
}
