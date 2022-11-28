import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewTrainningComponent } from './new-trainning.component';

describe('NewTrainningComponent', () => {
  let component: NewTrainningComponent;
  let fixture: ComponentFixture<NewTrainningComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewTrainningComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NewTrainningComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
