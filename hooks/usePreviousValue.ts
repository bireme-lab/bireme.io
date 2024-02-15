import { useEffect, useRef } from "react";

export const usePreviousValue = <T>(value: T) => {
  const ref = useRef<T>(value);

  useEffect(() => {
    return () => {
      ref.current = value;
    };
  }, [value]);

  return ref;
};
