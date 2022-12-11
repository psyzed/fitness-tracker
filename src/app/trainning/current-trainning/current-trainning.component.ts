import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

import { StopTrainningDialogComponent } from './stop-trainning-dialog.component';

@Component({
  selector: 'app-current-trainning',
  templateUrl: './current-trainning.component.html',
  styleUrls: ['./current-trainning.component.css'],
})
export class CurrentTrainningComponent implements OnInit {
  @Output() trainningExit = new EventEmitter();
  progress = 0;
  timer: any;

  constructor(private dialog: MatDialog) {}

  ngOnInit() {
    this.startOrResumeTimer();
  }

  startOrResumeTimer() {
    this.timer = setInterval(() => {
      this.progress = this.progress + 5;
      if (this.progress >= 100) {
        clearInterval(this.timer);
      }
    }, 1000);
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
        this.trainningExit.emit();
      } else {
        this.startOrResumeTimer();
      }
    });
  }
}
