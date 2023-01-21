import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Store } from '@ngrx/store';

import * as fromTraining from '../store/training.reducer';
import * as fromAppState from '../../app.reducer';

import { Exercise } from '../exercise.model';
import { TrainningService } from '../trainning.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-new-trainning',
  templateUrl: './new-trainning.component.html',
  styleUrls: ['./new-trainning.component.css'],
})
export class NewTrainningComponent implements OnInit {
  availableExercises$: Observable<Exercise[]>;
  isLoading$: Observable<boolean>;

  constructor(
    private trainningService: TrainningService,
    private store: Store<fromTraining.State>
  ) {}

  ngOnInit(): void {
    this.isLoading$ = this.store.select(fromAppState.getIsLoading);
    this.availableExercises$ = this.store.select(
      fromTraining.getAvailableExercises
    );
    this.onFetchExercises();
  }

  onFetchExercises() {
    this.trainningService.fetchAvailableExercises();
  }

  onStartTrainning(form: NgForm) {
    this.trainningService.startExercise(form.value.exercise);
  }
}
