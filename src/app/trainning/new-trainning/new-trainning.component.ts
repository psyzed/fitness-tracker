import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

import { Exercise } from '../exercise.model';
import { TrainningService } from '../trainning.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-new-trainning',
  templateUrl: './new-trainning.component.html',
  styleUrls: ['./new-trainning.component.css'],
})
export class NewTrainningComponent implements OnInit, OnDestroy {
  availableExercises: Exercise[];
  exerciseSub: Subscription;

  constructor(private trainningService: TrainningService) {}

  ngOnInit(): void {
    this.exerciseSub = this.trainningService.exercisesChanged.subscribe(
      (exercises) => (this.availableExercises = exercises)
    );
    this.trainningService.fetchAvailableExercises();
  }

  onStartTrainning(form: NgForm) {
    this.trainningService.startExercise(form.value.exercise);
  }

  ngOnDestroy(): void {
    this.exerciseSub.unsubscribe();
  }
}
