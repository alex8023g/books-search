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
  startIndex: number;
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

export const INCSTARTINDEX = 'INCSTARTINDEX';
type IncStartIndex = {
  type: typeof INCSTARTINDEX;
  // startIndex: number;
};
export const incStartIndexAction: ActionCreator<IncStartIndex> = () => ({
  type: INCSTARTINDEX,
});

export const RESETSTARTINDEX = 'RESETSTARTINDEX';
type ResetStartIndex = {
  type: typeof RESETSTARTINDEX;
};
export const resetStartIndexAction: ActionCreator<ResetStartIndex> = () => ({
  type: RESETSTARTINDEX,
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
  startIndex: 0,
  isLoading: false,
};

type MyAction = Loading | Search | IncStartIndex | ResetStartIndex;

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
    case INCSTARTINDEX:
      return {
        ...state,
        startIndex: state.startIndex + 1,
      };
    case RESETSTARTINDEX:
      return {
        ...state,
        startIndex: 0,
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
