import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from './material.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { AngularFireModule } from '@angular/fire/';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { environment } from '../environments/environment';

import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { SignupComponent } from './auth/signup/signup.component';
import { LoginComponent } from './auth/login/login.component';
import { TrainningComponent } from './trainning/trainning.component';
import { CurrentTrainningComponent } from './trainning/current-trainning/current-trainning.component';
import { NewTrainningComponent } from './trainning/new-trainning/new-trainning.component';
import { PastTrainningsComponent } from './trainning/past-trainnings/past-trainnings.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { HeaderComponent } from './navigation/header/header.component';
import { SidenavListComponent } from './navigation/sidenav-list/sidenav-list.component';
import { StopTrainningDialogComponent } from './trainning/current-trainning/stop-trainning-dialog.component';

@NgModule({
  declarations: [
    AppComponent,
    SignupComponent,
    LoginComponent,
    TrainningComponent,
    CurrentTrainningComponent,
    NewTrainningComponent,
    PastTrainningsComponent,
    WelcomeComponent,
    HeaderComponent,
    SidenavListComponent,
    StopTrainningDialogComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    AppRoutingModule,
    FlexLayoutModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    AngularFireAuthModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents: [StopTrainningDialogComponent],
})
export class AppModule {}
