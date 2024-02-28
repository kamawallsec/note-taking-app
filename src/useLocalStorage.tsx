import React, { useEffect, useState } from "react";

export default function useLocalStorage<T>(
  key: string,
  initialValue: T | (() => T)
) {
  const [value, setValue] = useState<T>(() => {
    const localData = localStorage.getItem(key);

    if (localData == null) {
      if (typeof initialValue === "function") {
        return (initialValue as () => T)();
      } else {
        return initialValue;
      }
    } else {
      return JSON.parse(localData);
    }
  }); // check if the value changes

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [value, key]); // then update it

  return [value, setValue] as [T, typeof setValue];
}
