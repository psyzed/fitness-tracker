import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Subscription } from 'rxjs';

import { Exercise } from '../exercise.model';

import { TrainningService } from '../trainning.service';
import { Store } from '@ngrx/store';
import * as trainingState from '../store/training.reducer';
@Component({
  selector: 'app-past-trainnings',
  templateUrl: './past-trainnings.component.html',
  styleUrls: ['./past-trainnings.component.css'],
})
export class PastTrainningsComponent implements OnInit, AfterViewInit {
  displayedColumns = ['date', 'name', 'calories', 'duration', 'state'];
  dataSource = new MatTableDataSource<Exercise>();
  finishedExercisesSub: Subscription;

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild('paginator') paginator: MatPaginator;

  constructor(
    private store: Store<trainingState.State>,
    private trainningService: TrainningService
  ) {}

  ngOnInit(): void {
    this.store
      .select(trainingState.getFinishedExercises)
      .subscribe((exercises: Exercise[]) => {
        this.dataSource.data = exercises;
      });

    this.trainningService.fetchCompletedExercises();
  }

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  doFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}
