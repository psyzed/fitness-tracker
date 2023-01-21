import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';
import { Store } from '@ngrx/store';

import * as fromAppState from '../app.reducer';
import * as UiActions from '../shared/store/ui.actions';
import * as AuthActions from './store/auth.actions';

import { AuthData } from './auth-data.model';
import { TrainningService } from '../trainning/trainning.service';
import { UIService } from '../shared/ui.service';

@Injectable({ providedIn: 'root' })
export class AuthService {
  constructor(
    private router: Router,
    private angularFireAuth: AngularFireAuth,
    private trainningService: TrainningService,
    private uiService: UIService,
    private store: Store<fromAppState.AppState>
  ) {}

  initAuthListener() {
    this.angularFireAuth.authState.subscribe((user) => {
      if (user) {
        this.store.dispatch(new AuthActions.SetAuthenticated());
        this.router.navigate(['/trainning']);
      } else {
        this.trainningService.cancelSubs();
        this.store.dispatch(new AuthActions.SetUnauthenticated());
        this.router.navigate(['/login']);
      }
    });
  }

  registerUser(authData: AuthData) {
    this.store.dispatch(new UiActions.StartLoading());
    this.angularFireAuth.auth
      .createUserWithEmailAndPassword(authData.email, authData.password)
      .then((result) => {
        this.store.dispatch(new UiActions.StopLoading());
      })
      .catch((error) => {
        this.store.dispatch(new UiActions.StopLoading());
        this.uiService.showSnackbar(error.message, null, 3000);
      });
  }

  login(authData: AuthData) {
    this.store.dispatch(new UiActions.StartLoading());
    this.angularFireAuth.auth
      .signInWithEmailAndPassword(authData.email, authData.password)
      .then((result) => this.store.dispatch(new UiActions.StopLoading()))
      .catch((error) => {
        this.store.dispatch(new UiActions.StopLoading());
        this.uiService.showSnackbar(error.message, null, 3000);
      });
  }

  logout() {
    this.angularFireAuth.auth.signOut();
  }
}
