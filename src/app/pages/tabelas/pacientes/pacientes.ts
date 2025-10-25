import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListBaseComponent } from '../../../shared/list-base/list-base.component';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { PacienteFormDialogComponent } from './paciente-form-dialog';

@Component({
  selector: 'app-pacientes',
  standalone: true,
  imports: [CommonModule, ListBaseComponent, MatDialogModule],
  templateUrl: './pacientes.html',
  styleUrls: ['./pacientes.css'],
})
export class PacientesComponent {
  constructor(private dialog: MatDialog) {}
  data = [
    {
      matricula: '0001',
      nome: 'João Silva',
      nascimento: '1980-05-10',
      cpf: '123.456.789-00',
      cidade: 'São Paulo',
      bairro: 'Centro',
      telefone: '(11)99999-0000',
      email: 'joao@example.com',
    },
    {
      matricula: '0002',
      nome: 'Maria Silva',
      nascimento: '1980-05-10',
      cpf: '123.456.789-00',
      cidade: 'São Paulo',
      bairro: 'Centro',
      telefone: '(11)99999-0000',
      email: 'joao@example.com',
    },
  ];

  columns = [
    { key: 'matricula', title: 'Matrícula' },
    { key: 'nome', title: 'Nome' },
    { key: 'nascimento', title: 'Nascimento' },
    { key: 'cpf', title: 'CPF' },
    { key: 'cidade', title: 'Cidade' },
    { key: 'bairro', title: 'Bairro' },
    { key: 'telefone', title: 'Telefone' },
    { key: 'email', title: 'E-mail' },
  ];

  editing: any = null;
  sexoOptions = [
    { value: 'F', label: 'Feminino' },
    { value: 'M', label: 'Masculino' },
  ];
  racaOptions = [
    { value: '1', label: 'Branca' },
    { value: '2', label: 'Preta' },
    { value: '3', label: 'Parda' },
    { value: '4', label: 'Amarela' },
    { value: '5', label: 'Indígena' },
  ];

  onAdd() {
    this.openDialog(null);
  }

  onEdit(item: any) {
    this.openDialog(item);
  }

  openDialog(initial: any) {
    const ref = this.dialog.open(PacienteFormDialogComponent, {
      width: '1100px',
      data: { initial: initial, sexoOptions: this.sexoOptions, racaOptions: this.racaOptions },
    });
    ref.afterClosed().subscribe((res) => {
      if (res && res.saved) {
        this.onSave(res.payload);
      }
    });
  }

  onDelete(item: any) {
    this.data = this.data.filter((d: any) => d.matricula !== item.matricula);
  }

  onSave(payload: any) {
    if (this.editing) {
      // update
      const idx = this.data.findIndex((d: any) => d.matricula === this.editing.matricula);
      if (idx >= 0) this.data[idx] = payload;
    } else {
      this.data = [payload, ...this.data];
    }
  }

  onCancel() {
    /* handled by dialog */
  }
}
