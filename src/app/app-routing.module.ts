import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {HomeComponent} from './components/home/home.component';
import {SignInComponent} from './components/sign-in/sign-in.component';
import {AuthGuard} from './auth.guard';
import {ManageUserComponent} from './components/manage-user/manage-user.component';
import {BadRequestComponent} from './components/bad-request/bad-request.component';
import {ManageAppComponent} from './components/manage-app/manage-app.component';
import {AddUserComponent} from './components/add-user/add-user.component';
import {AddAppComponent} from './components/add-app/add-app.component';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent, canActivate: [AuthGuard] },
  { path: 'manage/user', component: ManageUserComponent, canActivate: [AuthGuard] },
  { path: 'manage/user/add', component: AddUserComponent, canActivate: [AuthGuard] },
  { path: 'manage/app', component: ManageAppComponent, canActivate: [AuthGuard] },
  { path: 'manage/app/add', component: AddAppComponent, canActivate: [AuthGuard] },
  { path: 'signin', component: SignInComponent },
  { path: 'badrequest', component: BadRequestComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
