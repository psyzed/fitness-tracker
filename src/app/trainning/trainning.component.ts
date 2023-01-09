import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { TrainningService } from './trainning.service';

@Component({
  selector: 'app-trainning',
  templateUrl: './trainning.component.html',
  styleUrls: ['./trainning.component.css'],
})
export class TrainningComponent implements OnInit, OnDestroy {
  ongoingTrainning = false;
  exerciseSub: Subscription;

  constructor(private trainningService: TrainningService) {}

  ngOnInit(): void {
    this.exerciseSub = this.trainningService.exerciseChanged.subscribe(
      (exercise) => {
        if (exercise) {
          this.ongoingTrainning = true;
        } else {
          this.ongoingTrainning = false;
        }
      }
    );
  }

  ngOnDestroy(): void {
    if (this.exerciseSub) {
      this.exerciseSub.unsubscribe();
    }
  }
}
