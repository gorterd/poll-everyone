import { useEffect, useRef } from "react";

// from react docs
export function usePrevious(value) {
  const ref = useRef();
  useEffect(() => {
    ref.current = value;
  });
  return ref.current;
}

export function useDropdown(eleRef, unfocusCB) {
  useEffect(() => {
    let unfocus = true;

    const clickInListener = eleRef.current.addEventListener('click', () => {
      unfocus = false;
    });

    const clickOutListener = document.addEventListener('click', () => {
      if (unfocus) unfocusCB();
      unfocus = true;
    });

    return () => {
      removeEventListener('click', clickOutListener);
      removeEventListener('click', clickInListener);
    }
  }, []);
}