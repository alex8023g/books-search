import { Action, ActionCreator, Reducer } from 'redux';

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
}
export type RootState = {
  searchParams: SearchParams;
  isLoading: boolean;
  // loadingError?: LoadError;
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

export const LOADING = 'LOADING';
type Loading = {
  type: typeof LOADING;
  isLoading: boolean;
};
export const loadingAction: ActionCreator<Loading> = (isLoading) => ({
  type: LOADING,
  isLoading: isLoading,
});

const initialState: RootState = {
  searchParams: {
    searchQuery: '',
    category: 'all',
    orderBy: 'relevance',
  },
  isLoading: false,
};

type MyAction = Loading | Search;

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
      };
    // case LOADING_ERROR:
    //   return {
    //     ...state,
    //     isLoading: false,
    //     loadingError: action.loadingError,
    //   };
    default:
      return state;
  }
};
