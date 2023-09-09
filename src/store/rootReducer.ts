import { ActionCreator, Reducer } from 'redux';

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
};

type MyAction = Loading | Search | IncStartIndex | IsLoadingError | IsLoadMore;

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
    default:
      return state;
  }
};
