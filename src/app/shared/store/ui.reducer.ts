import * as UiActions from './ui.actions';

export interface State {
  isLoading: boolean;
}

const initialState: State = {
  isLoading: false,
};

export function uiReducer(
  state = initialState,
  action: UiActions.UIActionsTypes
) {
  switch (action.type) {
    case UiActions.START_LOADING:
      return {
        isLoading: true,
      };
    case UiActions.STOP_LOADING:
      return {
        isLoading: false,
      };
    default:
      return state;
  }
}

export const getIsLoading = (state: State) => state.isLoading;
