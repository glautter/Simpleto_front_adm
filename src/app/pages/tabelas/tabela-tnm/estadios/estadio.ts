import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { ListBaseComponent } from '../../../../shared/list-base/list-base.component';
// ❌ REMOVA esta importação:
// import { EstadioFormDialogComponent } from './estadio-form-dialog';
import { EstadioService } from './estadio.service';
import { Estadio } from '../../../../shared/models/tabelas/estadio.model';

@Component({
  selector: 'app-estadios',
  standalone: true,
  imports: [CommonModule, ListBaseComponent, MatDialogModule ],
  templateUrl: './estadio.html',
  styleUrls: ['./estadio.css']
})
export class EstadioComponent {
  data: Estadio[] = [];
  columns = [
    { key: 'id', title: 'ID' },
    { key: 'descricaoEstadio', title: 'Descrição' },
    { key: 'descricaoT', title: 'Descrição T' },
    { key: 'descricaoN', title: 'Descrição N' },
    { key: 'descricaoM', title: 'Descrição M' }
  ];

  constructor(private dialog: MatDialog, private estadioService: EstadioService) {
    this.load();
  }

  load() {
    this.estadioService.getAll().subscribe({
      next: res => (this.data = res),
      error: err => console.error('Erro ao carregar estádios', err)
    });
  }

  onAdd() {
    this.openDialog(null);
  }

  onEdit(item: Estadio) {
    this.openDialog(item);
  }

  onDelete(item: Estadio) {
    this.estadioService.delete(item.id).subscribe(() => this.load());
  }

  async openDialog(initial: Estadio | null) {
    // ✅ Lazy load do dialog component
    const { EstadioFormDialogComponent } = await import('./estadio-form-dialog');
    
    const ref = this.dialog.open(EstadioFormDialogComponent, {
      width: '600px',
      data: { initial }
    });

    ref.afterClosed().subscribe(res => {
      if (res && res.saved) this.load();
    });
  }
}