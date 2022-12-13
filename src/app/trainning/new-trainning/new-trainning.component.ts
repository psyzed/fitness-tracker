import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Exercise } from '../exercise.model';
import { TrainningService } from '../trainning.service';

@Component({
  selector: 'app-new-trainning',
  templateUrl: './new-trainning.component.html',
  styleUrls: ['./new-trainning.component.css'],
})
export class NewTrainningComponent implements OnInit {
  availableExercises: Exercise[];

  constructor(private trainningService: TrainningService) {}

  ngOnInit(): void {
    this.availableExercises = this.trainningService.getExercises();
  }

  onStartTrainning(form: NgForm) {
    this.trainningService.startExercise(form.value.exercise);
  }
}
