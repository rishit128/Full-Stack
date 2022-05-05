import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SigninComponent } from './Components/signin/signin.component';
import { SignupComponent } from './Components/signup/signup.component';
import { NavbarComponent } from './Components/navbar/navbar.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { FlashMessagesModule } from 'angular2-flash-messages';
import { DashboardComponent } from './Components/dashboard/dashboard.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';

import { MatButtonModule } from '@angular/material/button';
import{MatSortModule} from '@angular/material/sort'
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@NgModule({
  declarations: [
    AppComponent,
    SigninComponent,
    SignupComponent,
    NavbarComponent,
    DashboardComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    MatButtonModule,
    MatTableModule,
    MatPaginatorModule,
    HttpClientModule,
    MatSortModule,
    ReactiveFormsModule,
    AppRoutingModule,
    MatFormFieldModule,
    MatInputModule,
    MDBBootstrapModule.forRoot(),
    FlashMessagesModule.forRoot(),
    BrowserAnimationsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
