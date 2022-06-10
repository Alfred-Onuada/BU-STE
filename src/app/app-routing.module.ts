import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ADashboardComponent } from './a-dashboard/a-dashboard.component';
import { AppComponent } from './app.component';
import { RoleGuard } from './guards/role.guard';
import { LoginComponent } from './login/login.component';
import { SDashboardComponent } from './s-dashboard/s-dashboard.component';
import { TDashboardComponent } from './t-dashboard/t-dashboard.component';

const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'login', component: LoginComponent },
  { 
    path: 'admin', component: ADashboardComponent, 
    canActivate: [RoleGuard], data: { expectedRole: 'admin' }
  },
  { 
    path: 'staff', component: TDashboardComponent,
    canActivate: [RoleGuard], data: { expectedRole: 'staff' } 
  },
  { 
    path: 'student', component: SDashboardComponent,
    canActivate: [RoleGuard], data: { expectedRole: 'student' } 
  },
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
