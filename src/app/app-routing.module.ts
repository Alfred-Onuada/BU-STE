import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ADashboardComponent } from './a-dashboard/a-dashboard.component';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { SDashboardComponent } from './s-dashboard/s-dashboard.component';
import { TDashboardComponent } from './t-dashboard/t-dashboard.component';

const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'login', component: LoginComponent },
  { path: 'admin', component: ADashboardComponent },
  { path: 'staff', component: TDashboardComponent },
  { path: 'student', component: SDashboardComponent },
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
