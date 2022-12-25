import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { AngularFireAuth } from '@angular/fire/auth';

import { AuthData } from './auth-data.model';
import { TrainningService } from '../trainning/trainning.service';

@Injectable({ providedIn: 'root' })
export class AuthService {
  authChange = new Subject<boolean>();
  private isAuthenticated = false;

  constructor(
    private router: Router,
    private angularFireAuth: AngularFireAuth,
    private trainningService: TrainningService
  ) {}

  initAuthListener() {
    this.angularFireAuth.authState.subscribe((user) => {
      if (user) {
        this.isAuthenticated = true;
        this.authChange.next(true);
        this.router.navigate(['/trainning']);
      } else {
        this.trainningService.cancelSubs();
        this.isAuthenticated = false;
        this.authChange.next(false);
        this.router.navigate(['/login']);
      }
    });
  }

  registerUser(authData: AuthData) {
    this.angularFireAuth.auth
      .createUserWithEmailAndPassword(authData.email, authData.password)
      .then((result) => {
        console.log(result);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  login(authData: AuthData) {
    this.angularFireAuth.auth
      .signInWithEmailAndPassword(authData.email, authData.password)
      .then((result) => console.log(result))
      .catch((error) => {
        console.log(error);
      });
  }

  logout() {
    this.angularFireAuth.auth.signOut().then((result) => {
      console.log(result);
    });
  }

  isAuth() {
    return this.isAuthenticated;
  }
}
