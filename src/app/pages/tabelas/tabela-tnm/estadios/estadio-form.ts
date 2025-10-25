import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-estadio-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatButtonModule],
  templateUrl: './estadio-form.html',
  styleUrls: ['./estadio-form.scss']
})
export class EstadioFormComponent {
  @Input() initialData: any = {};
  @Output() save = new EventEmitter();
  @Output() cancel = new EventEmitter();

  form: FormGroup;

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      id: [null],
      descricaoEstadio: ['', Validators.required],
      descricaoT: ['', Validators.required],
      descricaoN: ['', Validators.required],
      descricaoM: ['', Validators.required]
    });
  }

  ngOnInit() {
    if (this.initialData) this.form.patchValue(this.initialData);
  }

  onSubmit() {
    if (this.form.valid) {
      this.save.emit(this.form.value);
    } else {
      this.form.markAllAsTouched();
    }
  }

  onCancel() {
    this.cancel.emit();
  }
}
