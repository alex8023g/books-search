import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, SearchParams, loadingAction } from '../store/rootReducer';
// import { getBooks } from '../api/api';
import { BookData } from '../components/SearchResults';

export const step = 5;
export function useBooksData() {
  const [data, setData] = useState<BookData[]>([]);
  const [totalResults, setTotalResults] = useState<number>();
  const [loadMore, setLoadMore] = useState(false);
  const dispatch = useDispatch();
  // const searchParams = useSelector<RootState, SearchParams>(
  const { searchQuery, category, orderBy }: SearchParams = useSelector<
    RootState,
    SearchParams
  >((state) => state.searchParams);

  const startIndex = useSelector<RootState, number>((state) => state.startIndex);
  useEffect(() => {
    (async () => {
      if (startIndex === 0) {
        setData([]);
      }
      // console.log(searchParams);
      // const res = await getBooks(searchParams);
      console.log(searchQuery, category, orderBy);
      if (!searchQuery) return;
      const subject = category === 'all' ? '' : '+subject:' + category;
      const URI = `https://www.googleapis.com/books/v1/volumes?q=${searchQuery}${subject}&orderBy=${orderBy}&startIndex=${
        startIndex * step
      }&maxResults=${
        step + 1
      }&langRestrict=ru&key=AIzaSyBSv54tEpbFZQ6SuliVMeE7H7HNgNZnkJ8`;
      // const URI = `https://www.googleapis.com/books/v1/volumes?q=${searchQuery}${subject}&orderBy=${orderBy}&startIndex=${
      //   startIndex * step
      // }&maxResults=${step}&key=AIzaSyBSv54tEpbFZQ6SuliVMeE7H7HNgNZnkJ8`;

      console.log(URI);

      try {
        dispatch(loadingAction(true));
        let res = await fetch(URI);
        let { items, totalItems }: { items: BookData[]; totalItems: number } =
          await res.json();
        console.log('useBooksData', items, totalItems);
        // setData(items);
        setTotalResults(totalItems);
        // fetch(URI)
        //   .then((res) => res.json())
        //   .then((res) => console.log(res));
        if (items.length > step) {
          items.pop();
          setLoadMore(true);
        } else {
          setLoadMore(false);
        }
        setData((curr) => curr.concat(items));
      } catch {
        throw new Error('ошибка api запроса');
      }
      dispatch(loadingAction(false));
    })();
  }, [searchQuery, category, orderBy, startIndex]);
  return [data, totalResults, loadMore] as const;
}
