import { useEffect, useRef } from 'react';

export function useScrollToBottomAction(container: Document | HTMLElement, callback: VoidFunction, offset = 0) {
  const callbackRef = useRef(callback);

  useEffect(() => {
    callbackRef.current = callback;
  }, [callback]);

  useEffect(() => {
    if (!container) return;
    const handleScroll = () => {
      const scrollContainer = (
        container === document ? (document.scrollingElement as HTMLElement) : container
      ) as HTMLElement;

      if (scrollContainer.scrollTop + scrollContainer.clientHeight >= scrollContainer.scrollHeight - offset) {
        callbackRef.current();
      }
    };

    container.addEventListener('scroll', handleScroll);

    return () => {
      container.removeEventListener('scroll', handleScroll);
    };
  }, [container, offset]);
}
