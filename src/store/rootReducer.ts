import { ActionCreator, Reducer } from 'redux';
import { BookData } from '../components/SearchResults';

export type Category =
  | 'all'
  | 'art'
  | 'biography'
  | 'computers'
  | 'history'
  | 'medical'
  | 'poetry';

export type OrderBy = 'relevance' | 'newest';

export interface SearchParams {
  searchQuery: string;
  category: Category;
  orderBy: OrderBy;
  startIndex: number;
}
export type RootState = {
  searchParams: SearchParams;
  isLoading: boolean;
  isLoadMore: boolean;
  isLoadingError: boolean;
  fetchTrigger: boolean;
  booksData: BookData[];
  totalItems: number;
};

export const SEARCH = 'SEARCH';
type Search = {
  type: typeof SEARCH;
  searchParams: SearchParams;
};
export const searchAction: ActionCreator<Search> = (searchParams) => ({
  type: SEARCH,
  searchParams,
});

export const INCSTARTINDEX = 'INCSTARTINDEX';
type IncStartIndex = {
  type: typeof INCSTARTINDEX;
};
export const incStartIndexAction: ActionCreator<IncStartIndex> = () => ({
  type: INCSTARTINDEX,
});

export const LOADING = 'LOADING';
type Loading = {
  type: typeof LOADING;
  isLoading: boolean;
};
export const loadingAction: ActionCreator<Loading> = (isLoading) => ({
  type: LOADING,
  isLoading: isLoading,
});

export const ISLOADING_ERROR = 'ISLOADING_ERROR';
type IsLoadingError = {
  type: typeof ISLOADING_ERROR;
  isLoadingError: boolean;
};
export const isLoadingErrorAction: ActionCreator<IsLoadingError> = (isLoadingError) => ({
  type: ISLOADING_ERROR,
  isLoadingError,
});

export const ISLOADMORE = 'ISLOADMORE';
type IsLoadMore = {
  type: typeof ISLOADMORE;
  isLoadMore: boolean;
};
export const isLoadMoreAction: ActionCreator<IsLoadMore> = (isLoadMore) => ({
  type: ISLOADMORE,
  isLoadMore,
});

export const UPD_BOOKS_DATA = 'UPD_BOOKS_DATA';
type UpdBooksData = {
  type: typeof UPD_BOOKS_DATA;
  booksData: BookData[];
};
export const updBooksDataAction: ActionCreator<UpdBooksData> = (booksData) => ({
  type: UPD_BOOKS_DATA,
  booksData,
});

export const ADD_BOOKS_DATA = 'ADD_BOOKS_DATA';
type AddBooksData = {
  type: typeof ADD_BOOKS_DATA;
  booksData: BookData[];
};
export const addBooksDataAction: ActionCreator<AddBooksData> = (booksData) => ({
  type: ADD_BOOKS_DATA,
  booksData,
});

export const TOTAL_ITEMS = 'TOTAL_ITEMS';
type TotalItems = {
  type: typeof TOTAL_ITEMS;
  totalItems: number;
};
export const totalItemsAction: ActionCreator<TotalItems> = (totalItems) => ({
  type: TOTAL_ITEMS,
  totalItems,
});

const initialState: RootState = {
  searchParams: {
    searchQuery: '',
    category: 'all',
    orderBy: 'relevance',
    startIndex: 0,
  },
  isLoading: false,
  isLoadMore: false,
  isLoadingError: false,
  fetchTrigger: false,
  booksData: [],
  totalItems: -1,
};

type MyAction =
  | Loading
  | Search
  | IncStartIndex
  | IsLoadingError
  | IsLoadMore
  | UpdBooksData
  | TotalItems
  | AddBooksData;

export const rootReducer: Reducer<RootState, MyAction> = (
  state = initialState,
  action
) => {
  switch (action.type) {
    case LOADING:
      return {
        ...state,
        isLoading: action.isLoading,
      };
    case SEARCH:
      return {
        ...state,
        searchParams: action.searchParams,
        fetchTrigger: !state.fetchTrigger,
      };
    case INCSTARTINDEX:
      return {
        ...state,
        searchParams: {
          ...state.searchParams,
          startIndex: state.searchParams.startIndex + 1,
        },
      };
    case ISLOADMORE:
      return {
        ...state,
        isLoadMore: action.isLoadMore,
      };
    case ISLOADING_ERROR:
      return {
        ...state,
        isLoadingError: action.isLoadingError,
      };
    case UPD_BOOKS_DATA:
      return {
        ...state,
        booksData: action.booksData || [],
      };
    case ADD_BOOKS_DATA:
      return {
        ...state,
        booksData: state.booksData.concat(action.booksData),
      };
    case TOTAL_ITEMS:
      return {
        ...state,
        totalItems: action.totalItems,
      };
    default:
      return state;
  }
};
