import { useEffect }  from 'react';

/**
 * Hook that capture when clicks outside of the passed ref
 */
export function useOutside(ref, afterClick) {
  useEffect(() => {
    /**
     * Perform a call back after click outside
     */
    function handleClickOutside(event) {
      if (ref.current && !ref.current.contains(event.target)) {
        afterClick?.();
      }
    }
    // Bind the event listener
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [ref]);
}
