import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './presentation/home/home.component';
import { LoginComponent } from './presentation/auth/login/login.component';
import { AuthGuard, DeactivateLogin, DeactivateSignUp } from './presentation/auth/guard/auth.guard';
import { SignupComponent } from './presentation/auth/signup/signup.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent, canActivate: [AuthGuard] },
  { path: 'login', component: LoginComponent,  },
  { path: 'signup', component: SignupComponent, },
  { path: '', redirectTo: 'home', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
