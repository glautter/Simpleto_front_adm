// pacientes.ts
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListBaseComponent } from '../../../shared/list-base/list-base.component';
import { MatDialog, MatDialogModule, MatDialogConfig } from '@angular/material/dialog';
import { PacienteFormDialogComponent } from './paciente-form-dialog';

@Component({
  selector: 'app-pacientes',
  standalone: true,
  imports: [CommonModule, ListBaseComponent, MatDialogModule],
  templateUrl: './pacientes.html',
  styleUrls: ['./pacientes.scss'],
})
export class PacientesComponent {
  constructor(private dialog: MatDialog) { }

  data = [
    {
      matricula: '0001',
      nome: 'João Silva',
      nascimento: '1980-05-10',
      cpf: '123.456.789-00',
      cidade: 'São Paulo',
      bairro: 'Centro',
      telefone: '(11) 98888-1111',
      email: 'joao.silva@example.com',
    },
    {
      matricula: '0002',
      nome: 'Maria Oliveira',
      nascimento: '1985-09-22',
      cpf: '987.654.321-00',
      cidade: 'Rio de Janeiro',
      bairro: 'Copacabana',
      telefone: '(21) 97777-2222',
      email: 'maria.oliveira@example.com',
    },
    {
      matricula: '0003',
      nome: 'Pedro Santos',
      nascimento: '1992-03-15',
      cpf: '321.654.987-00',
      cidade: 'Curitiba',
      bairro: 'Batel',
      telefone: '(41) 96666-3333',
      email: 'pedro.santos@example.com',
    },
    {
      matricula: '0004',
      nome: 'Ana Souza',
      nascimento: '1990-11-05',
      cpf: '456.789.123-00',
      cidade: 'Belo Horizonte',
      bairro: 'Savassi',
      telefone: '(31) 95555-4444',
      email: 'ana.souza@example.com',
    },
    {
      matricula: '0005',
      nome: 'Carlos Pereira',
      nascimento: '1978-07-19',
      cpf: '159.753.486-20',
      cidade: 'Porto Alegre',
      bairro: 'Moinhos de Vento',
      telefone: '(51) 94444-5555',
      email: 'carlos.pereira@example.com',
    },
    {
      matricula: '0006',
      nome: 'Juliana Costa',
      nascimento: '1988-12-30',
      cpf: '852.963.741-00',
      cidade: 'Fortaleza',
      bairro: 'Aldeota',
      telefone: '(85) 93333-6666',
      email: 'juliana.costa@example.com',
    },
    {
      matricula: '0007',
      nome: 'Rodrigo Almeida',
      nascimento: '1995-01-09',
      cpf: '741.258.963-00',
      cidade: 'Recife',
      bairro: 'Boa Viagem',
      telefone: '(81) 92222-7777',
      email: 'rodrigo.almeida@example.com',
    },
    {
      matricula: '0008',
      nome: 'Fernanda Lima',
      nascimento: '1993-08-14',
      cpf: '258.147.369-00',
      cidade: 'Salvador',
      bairro: 'Pituba',
      telefone: '(71) 91111-8888',
      email: 'fernanda.lima@example.com',
    },
    {
      matricula: '0009',
      nome: 'Lucas Ribeiro',
      nascimento: '1982-06-18',
      cpf: '369.258.147-00',
      cidade: 'Campinas',
      bairro: 'Cambuí',
      telefone: '(19) 90000-9999',
      email: 'lucas.ribeiro@example.com',
    },
    {
      matricula: '0010',
      nome: 'Patrícia Carvalho',
      nascimento: '1997-04-11',
      cpf: '147.258.369-00',
      cidade: 'Florianópolis',
      bairro: 'Centro',
      telefone: '(48) 98888-0000',
      email: 'patricia.carvalho@example.com',
    },
    {
      matricula: '0011',
      nome: 'André Nascimento',
      nascimento: '1984-02-25',
      cpf: '963.852.741-00',
      cidade: 'Brasília',
      bairro: 'Asa Sul',
      telefone: '(61) 97777-1111',
      email: 'andre.nascimento@example.com',
    }
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
    this.editing = null; // Importante: limpa o editing ao adicionar novo
    this.openDialog(null);
  }

  onEdit(item: any) {
    this.editing = item; // Define o item sendo editado
    this.openDialog(item);
  }

  openDialog(initial: any) {
    // Configuração completa do dialog
    const dialogConfig = new MatDialogConfig();

    // Dimensões
    dialogConfig.width = '1200px';
    dialogConfig.maxWidth = '95vw';
    dialogConfig.height = 'auto';
    dialogConfig.maxHeight = '90vh';

    // Comportamento
    dialogConfig.disableClose = false; // Permite fechar clicando fora ou ESC
    dialogConfig.autoFocus = true; // Foca automaticamente no primeiro campo
    dialogConfig.restoreFocus = true; // Restaura o foco ao fechar

    // Classe CSS customizada (opcional)
    dialogConfig.panelClass = 'paciente-dialog-container';

    // Dados a serem passados para o dialog
    dialogConfig.data = {
      initial: initial,
      sexoOptions: this.sexoOptions,
      racaOptions: this.racaOptions
    };

    // Abre o dialog
    const ref = this.dialog.open(PacienteFormDialogComponent, dialogConfig);

    // Processa o resultado após fechar
    ref.afterClosed().subscribe((res) => {
      if (res && res.saved) {
        this.onSave(res.payload);
      }
    });
  }

  onDelete(item: any) {
    // Confirmação antes de deletar (opcional, mas recomendado)
    if (confirm(`Deseja realmente excluir o paciente ${item.nome}?`)) {
      this.data = this.data.filter((d: any) => d.matricula !== item.matricula);
    }
  }

  onSave(payload: any) {
    if (this.editing) {
      // Atualiza registro existente
      const idx = this.data.findIndex((d: any) => d.matricula === this.editing.matricula);
      if (idx >= 0) {
        this.data[idx] = payload;
      }
    } else {
      // Adiciona novo registro no início da lista
      this.data = [payload, ...this.data];
    }

    // Limpa o editing após salvar
    this.editing = null;
  }

  onCancel() {
    // Limpa o editing ao cancelar
    this.editing = null;
  }
}