import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { SignInComponent } from './components/sign-in/sign-in.component';
import { NavigationComponent } from './components/navigation/navigation.component';
import {FormsModule} from '@angular/forms';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {
  MatButtonModule, MatCardModule, MatDialogModule,
  MatDividerModule,
  MatIconModule,
  MatInputModule,
  MatListModule,
  MatMenuModule, MatPaginatorModule,
  MatProgressBarModule, MatSortModule, MatTableModule,
  MatTabsModule,
  MatToolbarModule,
  MatTooltipModule
} from '@angular/material';
import {HttpClientModule} from '@angular/common/http';
import { ManageUserComponent } from './components/manage-user/manage-user.component';
import { BadRequestComponent } from './components/bad-request/bad-request.component';
import { ManageAppComponent } from './components/manage-app/manage-app.component';
import { DialogUserViewComponent } from './components/dialog-user-view/dialog-user-view.component';
import { AddUserComponent } from './components/add-user/add-user.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    SignInComponent,
    NavigationComponent,
    ManageUserComponent,
    BadRequestComponent,
    ManageAppComponent,
    DialogUserViewComponent,
    AddUserComponent
  ],
  entryComponents: [
    DialogUserViewComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatProgressBarModule,
    MatToolbarModule,
    MatMenuModule,
    MatTooltipModule,
    MatListModule,
    MatDividerModule,
    MatTabsModule,
    MatCardModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatDialogModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
