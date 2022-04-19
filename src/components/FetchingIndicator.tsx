import { useNProgress } from '@tanem/react-nprogress';
import cn from 'classnames';
import { useIsFetching } from 'react-query';

export default function FetchingIndicator() {
  const isFetching = useIsFetching();
  const { isFinished } = useNProgress({
    isAnimating: Boolean(isFetching),
    minimum: 0.5,
  });

  return (
    <div
      className={cn('pointer-events-none transition-opacity duration-200 ease-linear', {
        'animate-none opacity-0': isFinished,
        'animate-pulse opacity-100': !isFinished,
      })}
    >
      <div className='fixed left-0 top-0 z-50 h-1 w-full bg-green-600' />
    </div>
  );
}
