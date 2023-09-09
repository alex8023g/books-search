import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  RootState,
  SearchParams,
  isLoadMoreAction,
  loadingAction,
  isLoadingErrorAction,
  updBooksDataAction,
} from '../store/rootReducer';
import { BookData } from '../components/SearchResults';

export const step = 3;
export function useBooksData() {
  const [data, setData] = useState<BookData[]>([]);
  const [totalResults, setTotalResults] = useState<number>();
  const { searchQuery, category, orderBy, startIndex }: SearchParams = useSelector<
    RootState,
    SearchParams
  >((state) => state.searchParams);
  const fetchTrigger = useSelector<RootState>((state) => state.fetchTrigger);
  const dispatch = useDispatch();

  useEffect(() => {
    (async () => {
      if (startIndex === 0) {
        setData([]);
      }
      console.log(searchQuery, category, orderBy);
      if (!searchQuery) return;
      const subject = category === 'all' ? '' : '+subject:' + category;
      const URI = `https://www.googleapis.com/books/v1/volumes?q=${searchQuery}${subject}&orderBy=${orderBy}&startIndex=${
        startIndex * step
      }&maxResults=${
        step + 1
      }&langRestrict=ru&key=AIzaSyBSv54tEpbFZQ6SuliVMeE7H7HNgNZnkJ8`;

      console.log(URI);

      try {
        dispatch(loadingAction(true));
        dispatch(isLoadMoreAction(false));

        let res = await fetch(URI);
        let { items, totalItems }: { items: BookData[]; totalItems: number } =
          await res.json();
        console.log('useBooksData', items, totalItems);
        setTotalResults(totalItems);

        if (items && items.length > step) {
          items.pop();
          dispatch(isLoadMoreAction(true));
        } else {
          dispatch(isLoadMoreAction(false));
        }
        setData((curr) => curr.concat(items));
        dispatch(updBooksDataAction(items));
        console.log('api запроса без ошибки');
      } catch (err) {
        console.log('ошибка api запроса', err);
        dispatch(isLoadingErrorAction(true));
      } finally {
        dispatch(loadingAction(false));
      }
    })();
  }, [searchQuery, category, orderBy, startIndex, fetchTrigger]);
  return [data, totalResults] as const;
}
