import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  RootState,
  SearchParams,
  isLoadMoreAction,
  loadingAction,
  isLoadingErrorAction,
  updBooksDataAction,
  totalItemsAction,
  addBooksDataAction,
} from '../store/rootReducer';
import { BookData } from '../components/SearchResults';

export const step = 30;
export function useBooksData() {
  const { searchQuery, category, orderBy, startIndex }: SearchParams = useSelector<
    RootState,
    SearchParams
  >((state) => state.searchParams);
  const fetchTrigger = useSelector<RootState>((state) => state.fetchTrigger);
  const dispatch = useDispatch();
  const isMounted = useRef(false);

  useEffect(() => {
    (async () => {
      if (isMounted.current) {
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
          dispatch(totalItemsAction(totalItems));
          if (items && items.length > step) {
            items.pop();
            dispatch(isLoadMoreAction(true));
          } else {
            dispatch(isLoadMoreAction(false));
          }
          if (startIndex === 0) {
            dispatch(updBooksDataAction(items));
          } else {
            dispatch(addBooksDataAction(items));
          }
          console.log('api запроса без ошибки');
        } catch (err) {
          console.log('ошибка api запроса', err);
          dispatch(isLoadingErrorAction(true));
        } finally {
          dispatch(loadingAction(false));
        }
      } else {
        isMounted.current = true;
      }
    })();
  }, [searchQuery, category, orderBy, startIndex, fetchTrigger]);
}
