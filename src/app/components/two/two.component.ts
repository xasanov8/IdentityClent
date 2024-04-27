import { Component, EventEmitter, Input, OnInit, Output, input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-two',
  templateUrl: './two.component.html',
  template: '<app-child [message]="this.form.value.tit"></app-child>',
  styleUrl: './two.component.scss'
})
export class TwoComponent implements OnInit{

  @Output() newItemEvent = new EventEmitter<string>();

  form!: FormGroup;

  constructor(private crudService: AuthService, private router: Router, private fb: FormBuilder, private matSnackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      tit: ['', Validators.required]
    });
  }
}
