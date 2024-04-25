import { Component, OnInit } from '@angular/core';
import { CreateUser } from '../../models/create-user';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent implements OnInit{
  form!: FormGroup;
  hide = true;

  constructor(private crudService: AuthService, private router: Router, private fb: FormBuilder, private matSnackBar: MatSnackBar) { }

  rolesStringArr: string = "";

  ngOnInit(): void {
    this.form = this.fb.group({
      fullname: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      status: ['', Validators.required],
      age: ['', Validators.required],
      roles: ['',Validators.required] // Initialize roles as an empty array
    });
  }

  register() {
    if (this.form.invalid) {
        return;
    }

    let roles: string[] = [];

    // Check if roles is a string before splitting
    if (typeof this.form.value.roles === 'string') {
        const roleString: string = this.form.value.roles;
        roles = roleString.split(' ').map((role: string) => role.trim());
    }

    this.form.value.roles = roles;
    
    this.crudService.register(this.form.value).subscribe({
        next: (response) => {
            console.log(response);
            console.log("Registration successful");
            this.form.reset(); // Reset the form after successful registration
            this.matSnackBar.open('Registration successful!', 'Close', {
                duration: 5000,
                horizontalPosition: 'center'
            });
            this.form.value.fullname = "";
            this.form.value.email = "";
            this.form.value.password = "";
            this.form.value.status = "";
            this.form.value.age = "";
            this.form.value.roles = "";
        },
        error: (err) => {
            console.log("Registration failed");
            console.log(err);
            this.matSnackBar.open(err.error.message, 'Close', {
                duration: 5000,
                horizontalPosition: 'center'
            });
        }
    });
  }
}
