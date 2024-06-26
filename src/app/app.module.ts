import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { LoginComponent } from './login/login.component';
import { ADashboardComponent } from './a-dashboard/a-dashboard.component';
import { SDashboardComponent } from './s-dashboard/s-dashboard.component';
import { TDashboardComponent } from './t-dashboard/t-dashboard.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatDividerModule } from '@angular/material/divider';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { NgChartsModule } from 'ng2-charts';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { DialogComponent } from './dialog/dialog.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatStepperModule } from '@angular/material/stepper';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CompletionDialogComponent } from './completion-dialog/completion-dialog.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome'
import { HttpClientModule } from '@angular/common/http';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatExpansionModule } from '@angular/material/expansion';
import { DeleteConfirmationDialogComponent } from './delete-confirmation-dialog/delete-confirmation-dialog.component';
import { EditDialogComponent } from './edit-dialog/edit-dialog.component';
import { MatListModule } from '@angular/material/list';
import { AddDialogComponent } from './add-dialog/add-dialog.component';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    LoginComponent,
    ADashboardComponent,
    SDashboardComponent,
    TDashboardComponent,
    DialogComponent,
    CompletionDialogComponent,
    DeleteConfirmationDialogComponent,
    EditDialogComponent,
    AddDialogComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatSidenavModule,
    MatDividerModule,
    MatButtonModule,
    MatTableModule,
    MatPaginatorModule,
    NgChartsModule,
    FormsModule,
    MatFormFieldModule,
    MatSelectModule,
    MatDialogModule,
    MatStepperModule,
    NgbModule,
    MatInputModule,
    FontAwesomeModule,
    HttpClientModule,
    MatProgressBarModule,
    MatExpansionModule,
    MatListModule,
    MatSlideToggleModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
