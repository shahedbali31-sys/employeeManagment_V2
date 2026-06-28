import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { EmployeeService } from '../../services/employee.service';
import { DepartmentService } from '../../services/department.service';

@Component({
  selector: 'app-add-employee',
  standalone: false,
  templateUrl: './add-employee.html',
  styleUrl: './add-employee.css',
})
export class AddEmployee implements OnInit {
  employeeForm!: FormGroup;
  isLoading = false;
  errorMessage = '';
  departments: any[] = [];

  constructor(
    private fb: FormBuilder,
    private employeeService: EmployeeService,
    private departmentService: DepartmentService,
    private router: Router
  ) {}

  ngOnInit() {
    this.employeeForm = this.fb.group({
      name: ['', Validators.required],
      departmentId: ['', Validators.required],
      salary: ['', [Validators.required, Validators.min(0)]],
    });

    this.departmentService.getDepartments().subscribe({
      next: (data: any[]) => this.departments = data,
      error: (err: any) => console.error('Error loading departments:', err)
    });
  }

  addEmployee() {
    if (this.employeeForm.invalid) {
      alert('Please fill in all fields');
      return;
    }

    this.isLoading = true;
    this.errorMessage = '';

    const newEmployee = {
      name: this.employeeForm.value.name,
      departmentId: Number(this.employeeForm.value.departmentId),
      salary: Number(this.employeeForm.value.salary),
    };

    this.employeeService.addEmployee(newEmployee).subscribe({
      next: () => {
        this.isLoading = false;
        this.employeeForm.reset();
        this.router.navigate(['/employees']);
      },
      error: (err: any) => {
        this.errorMessage = err.error?.message || 'Error adding employee';
        this.isLoading = false;
      },
    });
  }

  goBack(): void {
    this.router.navigate(['/employees']);
  }
}