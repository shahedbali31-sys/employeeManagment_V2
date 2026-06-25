import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { EmployeeService } from '../../services/employee.service';
import { DepartmentService } from '../../services/department.service';

@Component({
  selector: 'app-update-employee',
  standalone: false,
  templateUrl: './update-employee.html',
  styleUrl: './update-employee.css',
})
export class UpdateEmployee implements OnInit {
  employeeForm!: FormGroup;
  isLoading = false;
  errorMessage = '';
  employeeId = '';
  departments: any[] = [];

  constructor(
    private fb: FormBuilder,
    private employeeService: EmployeeService,
    private departmentService: DepartmentService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.employeeId = this.route.snapshot.paramMap.get('id') || '';

    this.employeeForm = this.fb.group({
      name: ['', Validators.required],
      departmentId: ['', Validators.required],
      salary: ['', [Validators.required, Validators.min(0)]],
    });

    this.departmentService.getDepartments().subscribe({
      next: (data: any[]) => {
        this.departments = data;

        this.employeeService.getEmployeeById(this.employeeId).subscribe({
          next: (employee) => {
            this.employeeForm.patchValue({
              name: employee.name,
              departmentId: employee.departmentId,
              salary: employee.salary,
            });
          },
          error: (err: any) => console.error('Error loading employee:', err),
        });
      },
      error: (err: any) => console.error('Error loading departments:', err)
    });
  }

  updateEmployee() {
    if (this.employeeForm.invalid) {
      alert('Please fill in all fields');
      return;
    }

    this.isLoading = true;
    this.errorMessage = '';

    const updatedEmployee = {
      name: this.employeeForm.value.name,
      departmentId: Number(this.employeeForm.value.departmentId),
      salary: Number(this.employeeForm.value.salary),
    };

    this.employeeService.updateEmployee(this.employeeId, updatedEmployee).subscribe({
      next: () => {
        this.isLoading = false;
        this.router.navigate(['/employees']);
      },
      error: (err: any) => {
        this.errorMessage = err.error?.message || 'Error updating employee';
        this.isLoading = false;
      },
    });
  }
}