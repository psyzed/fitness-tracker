import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PastTrainningsComponent } from './past-trainnings.component';

describe('PastTrainningsComponent', () => {
  let component: PastTrainningsComponent;
  let fixture: ComponentFixture<PastTrainningsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PastTrainningsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PastTrainningsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
