import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { SignInComponent } from './components/sign-in/sign-in.component';
import { NavigationComponent } from './components/navigation/navigation.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {
  MatAutocompleteModule,
  MatButtonModule, MatCardModule, MatCheckboxModule, MatDatepickerModule, MatDialogModule,
  MatDividerModule,
  MatIconModule,
  MatInputModule,
  MatListModule,
  MatMenuModule, MatNativeDateModule, MatPaginatorModule,
  MatProgressBarModule, MatSelectModule, MatSlideToggleModule, MatSnackBarModule, MatSortModule, MatTableModule,
  MatTabsModule,
  MatToolbarModule,
  MatTooltipModule
} from '@angular/material';
import {HttpClientModule} from '@angular/common/http';
import { ManageUserComponent } from './components/manage-user/manage-user.component';
import { BadRequestComponent } from './components/bad-request/bad-request.component';
import { ManageAppComponent } from './components/manage-app/manage-app.component';
import { DialogUserViewComponent } from './dialog/dialog-user-view/dialog-user-view.component';
import { AddUserComponent } from './components/add-user/add-user.component';
import { AddAppComponent } from './components/add-app/add-app.component';
import { EditAppComponent } from './components/edit-app/edit-app.component';
import { ManageLevelComponent } from './components/manage-level/manage-level.component';
import { DialogAddLevelComponent } from './dialog/dialog-add-level/dialog-add-level.component';
import { ManageLevelAppComponent } from './components/manage-level-app/manage-level-app.component';
import { DialogChangeLevelAppPermissionComponent } from './dialog/dialog-change-level-app-permission/dialog-change-level-app-permission.component';
import { EditUserComponent } from './components/edit-user/edit-user.component';
import { PrimeAccessComponent } from './components/prime-access/prime-access.component';
import { DialogPrimeAccessComponent } from './dialog/dialog-prime-access/dialog-prime-access.component';

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
    AddUserComponent,
    AddAppComponent,
    EditAppComponent,
    ManageLevelComponent,
    DialogAddLevelComponent,
    ManageLevelAppComponent,
    DialogChangeLevelAppPermissionComponent,
    EditUserComponent,
    PrimeAccessComponent,
    DialogPrimeAccessComponent
  ],
  entryComponents: [
    DialogUserViewComponent,
    DialogAddLevelComponent,
    DialogChangeLevelAppPermissionComponent,
    DialogPrimeAccessComponent
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
    MatDialogModule,
    MatSnackBarModule,
    MatSelectModule,
    ReactiveFormsModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSlideToggleModule,
    MatAutocompleteModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
