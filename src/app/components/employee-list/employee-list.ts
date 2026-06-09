import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { Router } from '@angular/router';
import { Employee } from '../../models/employee';
import { EmployeeService } from '../../services/employee.service';

@Component({
  selector: 'app-employee-list',
  standalone: false,
  templateUrl: './employee-list.html',
  styleUrl: './employee-list.css',
})
export class EmployeeList implements OnInit {
  employees: Employee[] = [];
  searchText: string = '';

  constructor(
    private employeeService: EmployeeService,
    private router: Router,
    private cdr: ChangeDetectorRef
  ) {
  
  }

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

  deleteEmployee(id: string): void {
    const confirmDelete = confirm('Are you sure?');
    if (confirmDelete) {
      this.employeeService.deleteEmployee(id).subscribe({
        next: () => this.loadEmployees(),
        error: (err) => console.error('Error deleting employee:', err),
      });
    }
  }

  goToAddEmployee(): void {
    this.router.navigate(['/add-employee']);
  }
}