import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState, SearchParams } from '../store/rootReducer';
// import { getBooks } from '../api/api';
import { BookData } from '../components/SearchResults';

export function useBooksData() {
  const [data, setData] = useState<BookData[]>([]);
  const [totalResults, setTotalResults] = useState<number>();
  // const searchParams = useSelector<RootState, SearchParams>(
  const { searchQuery, category, orderBy }: SearchParams = useSelector<
    RootState,
    SearchParams
  >((state) => state.searchParams);

  const startIndex = useSelector<RootState, number>((state) => state.startIndex);
  useEffect(() => {
    (async () => {
      // console.log(searchParams);
      // const res = await getBooks(searchParams);
      console.log(searchQuery, category, orderBy);
      if (!searchQuery) return;
      const subject = category === 'all' ? '' : '+subject:' + category;
      const step = 5;
      const URI = `https://www.googleapis.com/books/v1/volumes?q=${searchQuery}${subject}&orderBy=${orderBy}&startIndex=${1}&maxResults=${step}&langRestrict=ru&key=AIzaSyBSv54tEpbFZQ6SuliVMeE7H7HNgNZnkJ8`;
      // const URI = `https://www.googleapis.com/books/v1/volumes?q=${searchQuery}${subject}&orderBy=${orderBy}&startIndex=${
      //   startIndex * step
      // }&maxResults=${step}&key=AIzaSyBSv54tEpbFZQ6SuliVMeE7H7HNgNZnkJ8`;

      console.log(URI);

      try {
        let res = await fetch(URI);
        let { items, totalItems }: { items: BookData[]; totalItems: number } =
          await res.json();
        console.log('useBooksData', items, totalItems);
        setData(items);
        setTotalResults(totalItems);
        fetch(URI)
          .then((res) => res.json())
          .then((res) => console.log(res));
      } catch {
        throw new Error('ошибка api запроса');
      }
      // if (res) {
      // }
    })();
  }, [searchQuery, category, orderBy, startIndex]);
  return [data, totalResults] as const;
}
