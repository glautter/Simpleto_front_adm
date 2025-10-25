// funcionario-form.component.ts
import { Component, Input, Output, EventEmitter, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CrudTabsFormComponent } from '../../../shared/crud-tabs-form/crud-tabs-form.component';
import { CrudTabsConfig } from '../../../shared/models/crud-tabs-form/crud-tabs-form.model';

@Component({
  selector: 'app-funcionario-form',
  standalone: true,
  imports: [CommonModule, CrudTabsFormComponent],
  templateUrl: './funcionario-form.html',
  styleUrls: ['./funcionario-form.css']
})
export class FuncionarioFormComponent {
  @Input() initialData: any = {};
  @Output() save = new EventEmitter<any>();
  @Output() cancel = new EventEmitter<void>();

  @ViewChild(CrudTabsFormComponent) crudTabs!: CrudTabsFormComponent;

  config: CrudTabsConfig = {
    showTabsOnTop: true,
    tabs: [
      {
        id: 'dados-pessoais',
        label: 'Dados Pessoais',
        icon: '👤',
        fields: [
          { key: 'matricula', label: 'Matrícula', type: 'text', size: 3, required: true },
          { key: 'cpf', label: 'CPF', type: 'text', size: 3, required: true, mask: 'cpf' },
          { key: 'nome', label: 'Nome Completo', type: 'text', size: 6, required: true },
          { key: 'nascimento', label: 'Data de Nascimento', type: 'date', size: 3, required: true },
          { key: 'sexo', label: 'Sexo', type: 'select', size: 3, required: true, 
            options: [
              { value: 'M', label: 'Masculino' },
              { value: 'F', label: 'Feminino' },
              { value: 'O', label: 'Outro' }
            ]
          },
          { key: 'estado_civil', label: 'Estado Civil', type: 'select', size: 3,
            options: [
              { value: 'solteiro', label: 'Solteiro(a)' },
              { value: 'casado', label: 'Casado(a)' },
              { value: 'divorciado', label: 'Divorciado(a)' },
              { value: 'viuvo', label: 'Viúvo(a)' }
            ]
          },
          { key: 'email', label: 'E-mail', type: 'text', size: 6 },
          { key: 'telefone', label: 'Telefone', type: 'text', size: 3, mask: 'phone' }
        ]
      },
      {
        id: 'endereco',
        label: 'Endereço',
        icon: '🏠',
        fields: [
          { key: 'cep', label: 'CEP', type: 'text', size: 2, mask: 'cep', required: true },
          { key: 'tipo_logradouro', label: 'Tipo', type: 'select', size: 2,
            options: [
              { value: 'rua', label: 'Rua' },
              { value: 'avenida', label: 'Avenida' },
              { value: 'travessa', label: 'Travessa' },
              { value: 'alameda', label: 'Alameda' }
            ]
          },
          { key: 'logradouro', label: 'Logradouro', type: 'text', size: 5, required: true },
          { key: 'numero', label: 'Número', type: 'text', size: 2, required: true },
          { key: 'complemento', label: 'Complemento', type: 'text', size: 3 },
          { key: 'bairro', label: 'Bairro', type: 'text', size: 4, required: true },
          { key: 'cidade', label: 'Cidade', type: 'text', size: 4, required: true },
          { key: 'estado', label: 'Estado', type: 'select', size: 2, required: true,
            options: [
              { value: 'SP', label: 'SP' },
              { value: 'RJ', label: 'RJ' },
              { value: 'MG', label: 'MG' },
              { value: 'ES', label: 'ES' }
              // ... adicionar demais estados
            ]
          }
        ]
      },
      {
        id: 'documentos',
        label: 'Documentos',
        icon: '📄',
        fields: [
          { key: 'rg_numero', label: 'RG Número', type: 'text', size: 3, required: true },
          { key: 'rg_orgao', label: 'Órgão Expedidor', type: 'text', size: 2, required: true },
          { key: 'rg_data_emissao', label: 'Data Emissão RG', type: 'date', size: 3 },
          { key: 'cnh_numero', label: 'CNH Número', type: 'text', size: 3 },
          { key: 'cnh_categoria', label: 'CNH Categoria', type: 'select', size: 2,
            options: [
              { value: 'A', label: 'A' },
              { value: 'B', label: 'B' },
              { value: 'AB', label: 'AB' },
              { value: 'C', label: 'C' },
              { value: 'D', label: 'D' },
              { value: 'E', label: 'E' }
            ]
          },
          { key: 'cnh_validade', label: 'CNH Validade', type: 'date', size: 3 },
          { key: 'ctps_numero', label: 'CTPS Número', type: 'text', size: 3 },
          { key: 'ctps_serie', label: 'CTPS Série', type: 'text', size: 2 },
          { key: 'pis_pasep', label: 'PIS/PASEP', type: 'text', size: 3 }
        ]
      },
      {
        id: 'informacoes-profissionais',
        label: 'Info. Profissionais',
        icon: '💼',
        fields: [
          { key: 'cargo', label: 'Cargo', type: 'text', size: 4, required: true },
          { key: 'departamento', label: 'Departamento', type: 'select', size: 4,
            options: [
              { value: 'ti', label: 'TI' },
              { value: 'rh', label: 'RH' },
              { value: 'financeiro', label: 'Financeiro' },
              { value: 'comercial', label: 'Comercial' }
            ]
          },
          { key: 'data_admissao', label: 'Data Admissão', type: 'date', size: 3, required: true },
          { key: 'salario', label: 'Salário', type: 'number', size: 3 },
          { key: 'tipo_contrato', label: 'Tipo Contrato', type: 'select', size: 3,
            options: [
              { value: 'clt', label: 'CLT' },
              { value: 'pj', label: 'PJ' },
              { value: 'estagio', label: 'Estágio' },
              { value: 'temporario', label: 'Temporário' }
            ]
          },
          { key: 'jornada', label: 'Jornada Trabalho', type: 'select', size: 3,
            options: [
              { value: '40h', label: '40h semanais' },
              { value: '44h', label: '44h semanais' },
              { value: '30h', label: '30h semanais' },
              { value: '20h', label: '20h semanais' }
            ]
          },
          { key: 'observacoes', label: 'Observações', type: 'textarea', size: 12 }
        ]
      }
    ]
  };

  onSave(data: any) {
    console.log('Dados do funcionário:', data);
    this.save.emit(data);
  }

  onCancel() {
    this.cancel.emit();
  }

  // Método para ser chamado externamente (ex: de um dialog)
  submit() {
    this.crudTabs?.submit();
  }
}