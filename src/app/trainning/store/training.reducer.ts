import { Exercise } from '../exercise.model';

import * as fromAppState from '../../app.reducer';
import * as TraningActions from './training.actions';
import { createFeatureSelector, createSelector } from '@ngrx/store';

export interface TrainingState {
  availableExercises: Exercise[];
  finishedExercises: Exercise[];
  activeExercise: Exercise;
}

export interface State extends fromAppState.AppState {
  training: TrainingState;
}

const initialState: TrainingState = {
  availableExercises: [],
  finishedExercises: [],
  activeExercise: null,
};

export function trainingReducer(
  state = initialState,
  action: TraningActions.TrainingActionsTypes
) {
  switch (action.type) {
    case TraningActions.SET_AVAILABLE_TRAININGS:
      return {
        ...state,
        availableExercises: action.payload,
      };
    case TraningActions.SET_FINISHED_TRAININGS:
      return {
        ...state,
        finishedExercises: action.payload,
      };
    case TraningActions.START_TRAINING:
      return {
        ...state,
        activeExercise: {
          ...state.availableExercises.find((ex) => ex.id === action.payload),
        },
      };
    case TraningActions.STOP_TRAINING:
      return {
        ...state,
        activeExercise: null,
      };
    default:
      return state;
  }
}

export const getTrainingState =
  createFeatureSelector<TrainingState>('training');

export const getAvailableExercises = createSelector(
  getTrainingState,
  (state: TrainingState) => state.availableExercises
);

export const getFinishedExercises = createSelector(
  getTrainingState,
  (state: TrainingState) => state.finishedExercises
);

export const getActiveExercise = createSelector(
  getTrainingState,
  (state: TrainingState) => state.activeExercise
);

export const getIsActiveTraining = createSelector(
  getTrainingState,
  (state: TrainingState) => state.activeExercise != null
);
