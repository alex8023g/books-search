import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState, SearchParams } from '../store/rootReducer';
import { getBooks } from '../api/api';
import { BookData } from '../components/SearchResults';

export function useBooksData() {
  const [data, setData] = useState<BookData[]>([]);
  const searchParams = useSelector<RootState, SearchParams>(
    (state) => state.searchParams
  );

  useEffect(() => {
    (async () => {
      console.log(searchParams);
      const res = await getBooks(searchParams);
      if (res) {
        setData(res);
      }
    })();
  }, [searchParams]);
  return [data];
}
