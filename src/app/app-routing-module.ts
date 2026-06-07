import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EmployeeList } from './components/employee-list/employee-list';
import { AddEmployee } from './components/add-employee/add-employee';

const routes: Routes = [
  { path: '', redirectTo: 'employees', pathMatch: 'full' },

  { path: 'employees', component: EmployeeList },

  { path: 'add-employee', component: AddEmployee }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
