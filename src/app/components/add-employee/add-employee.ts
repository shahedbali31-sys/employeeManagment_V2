import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { EmployeeService } from '../../services/employee.service';

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

  constructor(
    private fb: FormBuilder,
    private employeeService: EmployeeService,
    private router: Router
  ) {}

  ngOnInit() {
    this.employeeForm = this.fb.group({
      name: ['', Validators.required],
      department: ['', Validators.required],
      salary: ['', [Validators.required, Validators.min(0)]],
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
      department: this.employeeForm.value.department,
      salary: Number(this.employeeForm.value.salary),
    };

    this.employeeService.addEmployee(newEmployee).subscribe({
     next: () => {
  this.isLoading = false; 
  this.employeeForm.reset();
  this.router.navigate(['/employees']);
},
      error: (err) => {
        this.errorMessage = err.error?.message || 'Error adding employee';
        this.isLoading = false;
      },
    });
  }
}
