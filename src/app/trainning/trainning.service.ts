import { Injectable } from '@angular/core';
import { Subscription, map, take } from 'rxjs';
import { Exercise } from './exercise.model';
import { AngularFirestore } from '@angular/fire/firestore';
import { Store } from '@ngrx/store';

import * as fromTrainingState from './store/training.reducer';
import * as trainingActions from './store/training.actions';

import * as UiActions from '../shared/store/ui.actions';
import { UIService } from '../shared/ui.service';

@Injectable({ providedIn: 'root' })
export class TrainningService {
  private fireBaseSubs: Subscription[] = [];

  constructor(
    private dataBase: AngularFirestore,
    private uiService: UIService,
    private store: Store<fromTrainingState.State>
  ) {}

  fetchAvailableExercises() {
    this.store.dispatch(new UiActions.StartLoading());
    this.fireBaseSubs.push(
      this.dataBase
        .collection('availableExercises')
        .snapshotChanges()
        .pipe(
          map((docArray) => {
            return docArray.map((doc) => {
              return {
                id: doc.payload.doc.id,
                ...(doc.payload.doc.data() as Exercise),
              };
            });
          })
        )
        .subscribe(
          (exercises: Exercise[]) => {
            this.store.dispatch(new UiActions.StopLoading());
            this.store.dispatch(
              new trainingActions.SetAvailableTrainings(exercises)
            );
          },
          (error) => {
            this.store.dispatch(new UiActions.StopLoading());
            this.uiService.showSnackbar(
              'Fetching Exercises Failed, Please Try Again Later.',
              null,
              3000
            );
          }
        )
    );
  }

  startExercise(selectedId: string) {
    this.store.dispatch(new trainingActions.StartTraining(selectedId));
  }

  completeExercise() {
    this.store
      .select(fromTrainingState.getActiveExercise)
      .pipe(take(1))
      .subscribe((exercice) => {
        this.addDataToDatabase({
          ...exercice,
          date: new Date(),
          state: 'completed',
        });
        this.store.dispatch(new trainingActions.StopTraining());
      });
  }

  cancelExercise(progress: number) {
    this.store
      .select(fromTrainingState.getActiveExercise)
      .pipe(take(1))
      .subscribe((exercice) => {
        this.addDataToDatabase({
          ...exercice,
          duration: exercice.duration * (progress / 100),
          calories: exercice.calories * (progress / 100),
          date: new Date(),
          state: 'cancelled',
        });
        this.store.dispatch(new trainingActions.StopTraining());
      });
  }

  fetchCompletedExercises() {
    this.fireBaseSubs.push(
      this.dataBase
        .collection('finishedExercises')
        .valueChanges()
        .subscribe((exercises: Exercise[]) => {
          this.store.dispatch(
            new trainingActions.SetFinishedTrainings(exercises)
          );
        })
    );
  }

  cancelSubs() {
    this.fireBaseSubs.forEach((sub) => sub.unsubscribe());
  }

  private addDataToDatabase(exercise: Exercise) {
    this.dataBase.collection('finishedExercises').add(exercise);
  }
}
