import {
  AfterViewInit,
  Component,
  OnInit,
  ViewChild,
  OnDestroy,
} from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Subscription } from 'rxjs';
import { Exercise } from '../exercise.model';
import { TrainningService } from '../trainning.service';

@Component({
  selector: 'app-past-trainnings',
  templateUrl: './past-trainnings.component.html',
  styleUrls: ['./past-trainnings.component.css'],
})
export class PastTrainningsComponent
  implements OnInit, AfterViewInit, OnDestroy
{
  displayedColumns = ['date', 'name', 'calories', 'duration', 'state'];
  dataSource = new MatTableDataSource<Exercise>();
  finishedExercisesSub: Subscription;

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild('paginator') paginator: MatPaginator;

  constructor(private trainningService: TrainningService) {}

  ngOnInit(): void {
    this.finishedExercisesSub =
      this.trainningService.finishedExercisesChanged.subscribe(
        (exercises: Exercise[]) => {
          this.dataSource.data = exercises;
        }
      );
    this.trainningService.fetchCompletedExercises();
  }

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  doFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  ngOnDestroy(): void {
    this.finishedExercisesSub.unsubscribe();
  }
}
