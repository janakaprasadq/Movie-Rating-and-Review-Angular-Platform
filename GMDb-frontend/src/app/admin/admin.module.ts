import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { FirebaseAppModule } from '@angular/fire/app';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { environment } from '../environments/environment';
import { AngularFireStorageModule } from '@angular/fire/compat/storage';
import { AngularFireModule } from '@angular/fire/compat';
import { HttpClientJsonpModule, HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [],
  providers: [MatDatepickerModule],
  imports: [
    CommonModule, // Use CommonModule instead of BrowserModule
    AdminRoutingModule,
    FirebaseAppModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    HttpClientModule,
    FormsModule,
    //BrowserAnimationsModule, // Keep this for Angular Material

    AngularFireModule.initializeApp(environment.firebaseConfig), // Initialize Firebase
    AngularFireStorageModule,
  ],
})
export class AdminModule {}
