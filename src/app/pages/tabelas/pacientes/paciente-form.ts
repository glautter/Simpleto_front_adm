// paciente-form.ts
import {
  Component,
  Input,
  Output,
  EventEmitter,
  OnChanges,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormField } from '../../../shared/models/form-field/form-field.model';
import { CrudFormComponent } from '../../../shared/crud-form/crud-form.component';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatRadioModule } from '@angular/material/radio';
import { MatTooltipModule } from '@angular/material/tooltip';
@Component({
  selector: 'app-paciente-form',
  standalone: true,
  imports: [
    CommonModule,
    CrudFormComponent,
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatCheckboxModule,
    MatRadioModule,
    MatTooltipModule,
  ],
  templateUrl: './paciente-form.html',
  styleUrls: ['./paciente-form.scss'],
})
export class PacienteFormComponent implements OnChanges {
  @Input() title: string = '';
  @Input() initialData: any = {};
  @Input() sexoOptions: { value: any; label: string }[] = [];
  @Input() racaOptions: { value: any; label: string }[] = [];
  @Output() save = new EventEmitter<any>();
  @Output() cancel = new EventEmitter<void>();

  fields: FormField[] = [];
  @ViewChild(CrudFormComponent) crud!: CrudFormComponent;

  constructor() {
    this.buildFields();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['sexoOptions']) {
      this.buildFields();
    }
    if (changes['racaOptions']) {
      this.buildFields();
    }
  }

  private buildFields() {
    // all fields have size = 6 as requested
    this.fields = [
      { key: 'matricula', label: 'Matrícula', type: 'text', size: 3, required: true },
      { key: 'cpf', label: 'CPF', type: 'text', size: 3, required: true, mask: 'cpf' },
      { key: 'nome', label: 'Nome', type: 'text', size: 6, required: true },
      { key: 'cns', label: 'CNS', type: 'text', size: 2 },
      { key: 'sexo', label: 'Sexo', type: 'select', size: 2, options: this.sexoOptions || [] },
      { key: 'nascimento', label: 'Nascimento', type: 'date', size: 3 },
      { key: 'raca', label: 'Raça/Cor', type: 'select', size: 2, options: this.racaOptions || [] },
      { key: 'etnia', label: 'Etnia', type: 'select', size: 3, options: [] },
      { key: 'nacionalidade', label: 'Nacionalidade', type: 'select', size: 4, options: [] },
      { key: 'municipio', label: 'Município', type: 'text', size: 4 },
      { key: 'cep', label: 'CEP', type: 'text', size: 2, mask: 'cep' },
      { key: 'tipo_logradouro', label: 'Tipo Lograd.', type: 'select', size: 2, options: [] },
      { key: 'endereco', label: 'Endereço', type: 'text', size: 6 },
      { key: 'numero', label: 'Número', type: 'text', size: 2 },
      { key: 'complemento', label: 'Complemento', type: 'text', size: 4 },
      { key: 'bairro', label: 'Bairro', type: 'text', size: 4 },
      { key: 'ddd', label: 'DDD', type: 'text', size: 2 },
      { key: 'telefone', label: 'Telefone', type: 'text', size: 6, mask: 'phone' },
      { key: 'email', label: 'E-mail', type: 'text', size: 6 },
    ];
  }

  onSave(data: any) {
    this.save.emit(data);
  }
  onCancel() {
    this.cancel.emit();
  }

  // called from dialog wrapper to trigger submit
  submit() {
    this.crud?.submit();
  }
}
