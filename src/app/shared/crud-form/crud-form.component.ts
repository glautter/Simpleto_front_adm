// --crud-form-component
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { Component, EventEmitter, Input, Output, OnChanges, SimpleChanges, inject, PLATFORM_ID } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators, FormGroup } from '@angular/forms';
import { FormField } from '../models/form-field/form-field.model';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatFormField } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';

import {
  MatDatepickerModule
} from '@angular/material/datepicker';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE, MatNativeDateModule, NativeDateAdapter } from '@angular/material/core';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatRadioModule } from '@angular/material/radio';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatIcon, MatIconModule } from '@angular/material/icon';
import { A11yModule } from "@angular/cdk/a11y";

// Formato brasileiro de data
export const BR_DATE_FORMATS = {
  parse: {
    dateInput: 'DD/MM/YYYY',
  },
  display: {
    dateInput: 'DD/MM/YYYY',
    monthYearLabel: 'MMM YYYY',
    dateA11yLabel: 'DD/MM/YYYY',
    monthYearA11yLabel: 'MMMM YYYY',
  },
};

export class BrazilianDateAdapter extends NativeDateAdapter {
  override parse(value: any): Date | null {
    if (typeof value === 'string') {
      const parts = value.split('/');
      if (parts.length === 3) {
        const day = parseInt(parts[0], 10);
        const month = parseInt(parts[1], 10) - 1;
        const year = parseInt(parts[2], 10);
        return new Date(year, month, day);
      }
    }
    return null;
  }

  override format(date: Date, displayFormat: Object): string {
    if (!date) return '';
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  }
}

@Component({
  selector: 'app-crud-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatInputModule,
    MatFormFieldModule,
    MatFormField,
    MatButtonModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatCheckboxModule,
    MatRadioModule,
    MatTooltipModule,
    MatIcon,
    MatIconModule,
    A11yModule,
  ],
  templateUrl: './crud-form.component.html',
  styleUrls: ['./crud-form.component.scss'],
  providers: [
    { provide: MAT_DATE_LOCALE, useValue: 'pt-BR' },
    { provide: MAT_DATE_FORMATS, useValue: BR_DATE_FORMATS },
    { provide: DateAdapter, useClass: BrazilianDateAdapter }]
})
export class CrudFormComponent implements OnChanges {
  @Input() title: string = '';
  @Input() fields: FormField[] = [];
  @Input() initialData: any = {};
  @Input() readOnly = false;
  @Input() formWidth: string = '600px';

  @Output() save = new EventEmitter<any>();
  @Output() cancel = new EventEmitter<void>();
  @Output() close = new EventEmitter<void>();

  platformId = inject(PLATFORM_ID);
  isBrowser = isPlatformBrowser(this.platformId);

  form: FormGroup;

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({});
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['fields'] || changes['initialData']) {
      this.buildForm();
    }
  }
  onImageSelected(event: Event, field: any): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      const file = input.files[0];
      const reader = new FileReader();
      reader.onload = e => {
        field.preview = e.target?.result as string;
        this.form.get(field.key)?.setValue(file);
      };
      reader.readAsDataURL(file);
    }


  }
  private buildForm() {
    const group: any = {};
    (this.fields || []).forEach((f) => {
      const val = this.initialData?.[f.key] ?? null;
      const validators = [] as any[];
      if (f.required) validators.push(Validators.required);
      if (f.validators) {
        validators.push(...f.validators);
      }
      group[f.key] = [{ value: val, disabled: !!f.disabled || this.readOnly }, validators];
    });
    this.form = this.fb.group(group);
  }

  submit() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    this.save.emit(this.form.getRawValue());
  }

  doCancel() {
    this.cancel.emit();
  }
  doClose() {
    this.close.emit();
  }

  /** Return span 1..12 for grid layout based on field.size */
  getSpan(f: FormField): number {
    if (!f) return 12;
    const sz = typeof f.size === 'number' ? Math.floor(f.size) : 12;
    return Math.min(12, Math.max(1, sz));
  }

  /** Simple mask applier for a few common Brazilian formats */
  applyMask(ev: Event, f: FormField) {
    if (!f || !f.mask) return;
    const input = ev.target as HTMLInputElement;
    let v = input.value.replace(/\D/g, '');
    if (f.mask === 'cpf') {
      if (v.length > 11) v = v.substr(0, 11);
      v = v.replace(/(\d{3})(\d)/, '$1.$2');
      v = v.replace(/(\d{3})\.(\d{3})(\d)/, '$1.$2.$3');
      v = v.replace(/(\d{3})\.(\d{3})\.(\d{3})(\d)/, '$1.$2.$3-$4');
    } else if (f.mask === 'phone') {
      if (v.length > 11) v = v.substr(0, 11);
      if (v.length <= 10) {
        v = v.replace(/(\d{2})(\d)/, '($1) $2');
        v = v.replace(/(\d{4})(\d)/, '$1-$2');
      } else {
        v = v.replace(/(\d{2})(\d)/, '($1) $2');
        v = v.replace(/(\d{5})(\d)/, '$1-$2');
      }
    } else if (f.mask === 'cep') {
      if (v.length > 8) v = v.substr(0, 8);
      v = v.replace(/(\d{5})(\d)/, '$1-$2');
    }
    input.value = v;
    // update FormControl value without emitting another input event
    try {
      this.form.get(f.key)?.setValue(v, { emitEvent: false });
    } catch { }
  }

  getErrorMessage(f: FormField) {
    const control = this.form.get(f.key);
    if (!control) return '';
    if (f.errorMessage && control.hasError('required')) {
      return f.errorMessage;
    }
    if (control.hasError('required')) return 'Campo obrigatório';
    return '';
  }
}
