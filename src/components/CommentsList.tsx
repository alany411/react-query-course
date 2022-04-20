import CommentItem from '@/components/CommentItem';

type CommentsListProps = {
  comments: IssueComment[][];
};

export default function CommentsList({ comments }: CommentsListProps) {
  if (!comments) return null;

  return (
    <ul className='space-y-2'>
      {comments.map((commentPage) => commentPage.map((comment) => <CommentItem key={comment.id} comment={comment} />))}
    </ul>
  );
}
