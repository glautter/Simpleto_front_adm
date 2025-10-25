import { Component } from '@angular/core';
import { ListBaseComponent } from '../../../shared/list-base/list-base.component';
import { CommonModule } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { FuncionarioDialogComponent } from './funcionario-form-dialog';
import { FuncionarioFormComponent } from './funcionario-form';

@Component({
  selector: 'app-funcionarios',
  standalone: true,
  imports: [ ListBaseComponent, CommonModule],
  templateUrl: './funcionarios.html',
  styleUrls: ['./funcionarios.scss']
})
export class FuncionariosComponent {
  constructor(private dialog: MatDialog) {}
  data = [
    { abreviacao: 'AMR', nome: 'Ambrósio', endereco: 'Rua A', bairro: 'Centro', municipio: 'São Paulo', telefone: '21 9999-9999', email: 'joao@example.com' },
    { abreviacao: 'BVL', nome: 'Beviláqua', endereco: 'Av. das Palmeiras, 123', bairro: 'Jardins', municipio: 'Rio de Janeiro', telefone: '21 9888-7766', email: 'bevi@example.com' },
    { abreviacao: 'CLN', nome: 'Colina Verde', endereco: 'Rua das Flores, 45', bairro: 'Santa Cecília', municipio: 'Belo Horizonte', telefone: '31 9777-6655', email: 'colina@example.com' },
    { abreviacao: 'DSN', nome: 'Dourado Sul', endereco: 'Av. Brasil, 980', bairro: 'Boa Vista', municipio: 'Curitiba', telefone: '41 9666-5544', email: 'dourado@example.com' }
  ];  
  columns = [
    { key: 'abreviacao', title: 'Abreviação' },
    { key: 'nome', title: 'Nome' },
    { key: 'endereco', title: 'Endereço' },
    { key: 'bairro', title: 'Bairro' },
    { key: 'municipio', title: 'Município' },
    { key: 'telefoneCelular', title: 'Telefone Celular' },
    { key: 'email', title: 'E-mail' }
  ]

  editing: any = null;
    sexoOptions = [
      { value: 'F', label: 'Feminino' },
      { value: 'M', label: 'Masculino' }
  ];
  onAdd() {
      this.openDialog(null);
  }

  onEdit(item: any) {
    this.openDialog(item);
  }

  openDialog(initial: any) {
    const ref = this.dialog.open(FuncionarioFormComponent, {
      width: '1100px',
      //data: { initial: initial, sexoOptions: this.sexoOptions }
    });
    ref.afterClosed().subscribe(res => {
      if (res && res.saved) {
        this.onSave(res.payload);
      }
    });
  }

  onDelete(item: any) {
    this.data = this.data.filter((d: any) => d.abreviacao !== item.abreviacao);
  }

  onSave(payload: any) {
    if (this.editing) {
      // update
      const idx = this.data.findIndex((d: any) => d.abreviacao === this.editing.abreviacao);
      if (idx >= 0) this.data[idx] = payload;
    } else {
      this.data = [payload, ...this.data];
    }
  }

  onCancel() { /* handled by dialog */ }
}