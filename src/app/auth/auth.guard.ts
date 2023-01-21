import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  CanLoad,
  Route,
  RouterStateSnapshot,
  UrlSegment,
} from '@angular/router';
import { Store } from '@ngrx/store';
import { take } from 'rxjs';
import * as fromAppState from '../app.reducer';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate, CanLoad {
  constructor(private store: Store<fromAppState.AppState>) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    return this.store.select(fromAppState.getIsAuth).pipe(take(1));
  }

  canLoad(route: Route, segments: UrlSegment[]) {
    return this.store.select(fromAppState.getIsAuth).pipe(take(1));
  }
}
