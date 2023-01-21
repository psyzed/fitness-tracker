import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

import { Store } from '@ngrx/store';
import * as fromTraining from './store/training.reducer';

@Component({
  selector: 'app-trainning',
  templateUrl: './trainning.component.html',
  styleUrls: ['./trainning.component.css'],
})
export class TrainningComponent implements OnInit {
  ongoingTrainning$: Observable<boolean>;

  constructor(
    private store: Store<fromTraining.State>,
  ) {}

  ngOnInit(): void {
    this.ongoingTrainning$ = this.store.select(
      fromTraining.getIsActiveTraining
    );
  }
}
