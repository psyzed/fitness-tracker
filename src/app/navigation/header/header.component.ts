import { Component, EventEmitter, Output, OnInit } from '@angular/core';

import { Store } from '@ngrx/store';
import * as fromAppState from '../../app.reducer';
import { AuthService } from '../../auth/auth.service';

import { Observable } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  @Output() sidenavToggle = new EventEmitter<void>();
  isAuth$: Observable<boolean>;

  constructor(
    private store: Store<fromAppState.AppState>,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.isAuth$ = this.store.select(fromAppState.getIsAuth);
  }

  onToggleSidenav() {
    this.sidenavToggle.emit();
  }

  onLogout() {
    this.authService.logout();
  }
}
