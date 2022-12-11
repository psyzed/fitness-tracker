import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-new-trainning',
  templateUrl: './new-trainning.component.html',
  styleUrls: ['./new-trainning.component.css'],
})
export class NewTrainningComponent {
  @Output() trainningStart = new EventEmitter<void>();

  onStartTrainning() {
    this.trainningStart.emit();
  }
}
