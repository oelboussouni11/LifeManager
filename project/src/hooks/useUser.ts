import { useState, useEffect } from 'react';

export function useUser() {
  const [name, setName] = useState<string | null>(() => {
    return localStorage.getItem('user-name');
  });

  const saveName = (newName: string) => {
    localStorage.setItem('user-name', newName);
    setName(newName);
  };

  return { name, saveName };
}