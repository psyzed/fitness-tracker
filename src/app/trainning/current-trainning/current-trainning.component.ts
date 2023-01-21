import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { take } from 'rxjs';

import { Exercise } from '../exercise.model';
import * as trainingState from '../store/training.reducer';

import { TrainningService } from '../trainning.service';

import { StopTrainningDialogComponent } from './stop-trainning-dialog.component';

@Component({
  selector: 'app-current-trainning',
  templateUrl: './current-trainning.component.html',
  styleUrls: ['./current-trainning.component.css'],
})
export class CurrentTrainningComponent implements OnInit {
  progress = 0;
  timer: any;

  constructor(
    private store: Store<trainingState.State>,
    private dialog: MatDialog,
    private trainningService: TrainningService,
  ) {}

  ngOnInit() {
    this.startOrResumeTimer();
  }

  startOrResumeTimer() {
    this.store
      .select(trainingState.getActiveExercise)
      .pipe(take(1))
      .subscribe((exercise: Exercise) => {
        const step = (exercise.duration / 100) * 1000;
        this.timer = setInterval(() => {
          this.progress = this.progress + 1;
          if (this.progress >= 100) {
            this.trainningService.completeExercise();
            clearInterval(this.timer);
          }
        }, step);
      });
  }

  onStop() {
    clearInterval(this.timer);
    const dialogRef = this.dialog.open(StopTrainningDialogComponent, {
      data: {
        progress: this.progress,
      },
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.trainningService.cancelExercise(this.progress);
      } else {
        this.startOrResumeTimer();
      }
    });
  }
}
