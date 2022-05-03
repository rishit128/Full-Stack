import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './Components/dashboard/dashboard.component';
import { SigninComponent } from './Components/signin/signin.component';
import { SignupComponent } from './Components/signup/signup.component';
import { AuthGuardService } from './Components/_services/auth-guard.service';
const routes: Routes = [{
  path:'signin',
  component:SigninComponent
},
{
  path:'signup',
  component:SignupComponent
},
{
  path:'home',
  component:DashboardComponent,canActivate: [AuthGuardService]
}


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
