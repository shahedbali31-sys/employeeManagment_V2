import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { Router } from '@angular/router';
import { Employee } from '../../models/employee';
import { EmployeeService } from '../../services/employee.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-employee-list',
  standalone: false,
  templateUrl: './employee-list.html',
  styleUrl: './employee-list.css',
})
export class EmployeeList implements OnInit {
  employees: Employee[] = [];
  searchText: string = '';
  showConfirm = false;
  employeeToDeleteId: any = null;
  employeeToDeleteName: string = '';

  constructor(
    private employeeService: EmployeeService,
    private router: Router,
    private cdr: ChangeDetectorRef,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.loadEmployees();
  }

  loadEmployees(): void {
    this.employeeService.getEmployees(this.searchText || undefined).subscribe({
      next: (data) => {
        this.employees = [...data];
        this.cdr.detectChanges();
      },
      error: (err) => console.error('Error loading employees:', err),
    });
  }

  onSearch(): void {
    this.loadEmployees();
  }

  deleteEmployee(id: any, name: string): void {
    this.employeeToDeleteId = id;
    this.employeeToDeleteName = name;
    this.showConfirm = true;
  }

  confirmDelete(): void {
    this.showConfirm = false;
    this.employeeService.deleteEmployee(this.employeeToDeleteId).subscribe({
      next: () => {
        this.toastr.success(`${this.employeeToDeleteName} deleted successfully`, 'Deleted!');
        this.loadEmployees();
      },
      error: (err) => {
        this.toastr.error('Error deleting employee', 'Error');
        console.error('Error deleting employee:', err);
      },
    });
  }

  cancelDelete(): void {
    this.showConfirm = false;
    this.toastr.info('Delete cancelled', 'Cancelled');
  }

  goToAddEmployee(): void {
    this.router.navigate(['/add-employee']);
  }

  goToUpdateEmployee(id: any): void {
    this.router.navigate(['/update-employee', id]);
  }

  logout(): void {
    this.router.navigate(['/login']);
  }
}