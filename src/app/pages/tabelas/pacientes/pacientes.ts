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
  },
  {
    matricula: '0012',
    nome: 'Cláudia Ferreira',
    nascimento: '1991-10-01',
    cpf: '753.951.456-00',
    cidade: 'Natal',
    bairro: 'Tirol',
    telefone: '(84) 96666-2222',
    email: 'claudia.ferreira@example.com',
  },
  {
    matricula: '0013',
    nome: 'Thiago Gomes',
    nascimento: '1987-03-08',
    cpf: '159.357.258-00',
    cidade: 'Belém',
    bairro: 'Umarizal',
    telefone: '(91) 95555-3333',
    email: 'thiago.gomes@example.com',
  },
  {
    matricula: '0014',
    nome: 'Camila Rocha',
    nascimento: '1999-07-17',
    cpf: '357.159.456-00',
    cidade: 'Manaus',
    bairro: 'Adrianópolis',
    telefone: '(92) 94444-4444',
    email: 'camila.rocha@example.com',
  },
  {
    matricula: '0015',
    nome: 'Marcos Araújo',
    nascimento: '1983-09-03',
    cpf: '951.753.159-00',
    cidade: 'João Pessoa',
    bairro: 'Tambaú',
    telefone: '(83) 93333-5555',
    email: 'marcos.araujo@example.com',
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
