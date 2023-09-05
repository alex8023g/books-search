import { Action, ActionCreator, Reducer } from 'redux';

export type RootState = {
  isLoading: boolean;
  // loadingError?: LoadError;
};

export const LOADING = 'LOADING';
type Loading = {
  type: typeof LOADING;
  isLoading: boolean;
};
export const loadingAction: ActionCreator<Loading> = (isLoading) => ({
  type: LOADING,
  isLoading: isLoading,
});

const initialState = {
  isLoading: false,
};

type MyAction = Loading;

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
