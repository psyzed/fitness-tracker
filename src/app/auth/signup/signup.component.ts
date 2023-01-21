import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Observable } from 'rxjs';
import { AuthService } from '../auth.service';

import { Store } from '@ngrx/store';
import * as fromAppState from '../../app.reducer';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignupComponent implements OnInit {
  @ViewChild('f') signupForm: NgForm;
  maxDate: Date;
  isLoading$: Observable<boolean>;

  constructor(
    private authService: AuthService,
    private store: Store<fromAppState.AppState>
  ) {}

  ngOnInit() {
    this.isLoading$ = this.store.select(fromAppState.getIsLoading);
    this.maxDate = new Date();
    this.maxDate.setFullYear(this.maxDate.getFullYear() - 18); //Making sure the person is at least 18
  }

  onSubmit(signupForm: NgForm) {
    this.authService.registerUser({
      email: signupForm.value.email,
      password: signupForm.value.password,
    });
    this.signupForm.reset();
  }
}
