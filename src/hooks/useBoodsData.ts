import { useEffect, useState } from 'react';

export function useBooksData() {
  const [data, setData] = useState([]);
  useEffect(() => {});
  return [data];
}
