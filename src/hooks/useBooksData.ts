import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  RootState,
  SearchParams,
  isLoadMoreAction,
  loadingAction,
  isLoadingErrorAction,
} from '../store/rootReducer';
// import { getBooks } from '../api/api';
import { BookData } from '../components/SearchResults';

export const step = 5;
export function useBooksData() {
  const [data, setData] = useState<BookData[]>([]);
  const [totalResults, setTotalResults] = useState<number>();
  const [loadMore, setLoadMore] = useState(false);
  const dispatch = useDispatch();
  // const searchParams = useSelector<RootState, SearchParams>(
  const { searchQuery, category, orderBy, startIndex }: SearchParams = useSelector<
    RootState,
    SearchParams
  >((state) => state.searchParams);

  // const startIndex = useSelector<RootState, number>(
  //   (state) => state.searchParams.startIndex
  // );
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

      console.log(URI);

      try {
        // dispatch(isLoadingErrorAction(false));
        dispatch(loadingAction(true));
        dispatch(isLoadMoreAction(false));

        let res = await fetch(URI);
        let { items, totalItems }: { items: BookData[]; totalItems: number } =
          await res.json();
        console.log('useBooksData', items, totalItems);
        setTotalResults(totalItems);

        if (items.length > step) {
          items.pop();
          dispatch(isLoadMoreAction(true));
        } else {
          dispatch(isLoadMoreAction(false));
        }
        setData((curr) => curr.concat(items));
        console.log('api запроса без ошибки');
      } catch {
        console.log('ошибка api запроса');
        dispatch(isLoadingErrorAction(true));
      } finally {
        dispatch(loadingAction(false));
      }
    })();
  }, [searchQuery, category, orderBy, startIndex]);
  return [data, totalResults, loadMore] as const;
}
