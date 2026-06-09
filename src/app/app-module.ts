import { NgModule, provideBrowserGlobalErrorListeners } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { provideHttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';  

import { AppRoutingModule } from './app-routing-module';
import { App } from './app';
import { EmployeeList } from './components/employee-list/employee-list';
import { AddEmployee } from './components/add-employee/add-employee';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [App, EmployeeList, AddEmployee],
  imports: [BrowserModule, AppRoutingModule, FormsModule, ReactiveFormsModule, CommonModule],  // ← أضف CommonModule هون
  providers: [
    //provideBrowserGlobalErrorListeners(),
    provideHttpClient(),
  ],
  bootstrap: [App],
})
export class AppModule {}