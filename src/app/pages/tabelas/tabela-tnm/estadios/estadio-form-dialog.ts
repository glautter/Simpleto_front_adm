import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialogContent } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { EstadioFormComponent } from './estadio-form';
import { EstadioService } from './estadio.service';
import { Estadio } from '../../../../shared/models/tabelas/estadio.model';

@Component({
  selector: 'app-estadio-form-dialog',
  standalone: true,
  imports: [CommonModule, EstadioFormComponent, MatDialogContent],
  template: `
    <h2 mat-dialog-title>{{ data.initial ? 'Editar Estádio' : 'Novo Estádio' }}</h2>
    <mat-dialog-content>
      <app-estadio-form
        [initialData]="data.initial"
        (save)="onSave($event)"
        (cancel)="onCancel()">
      </app-estadio-form>
    </mat-dialog-content>
  `
})
export class EstadioFormDialogComponent {
  constructor(
    private ref: MatDialogRef<EstadioFormDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private estadioService: EstadioService
  ) {}

  onSave(formValue: Estadio) {
    const request$ = formValue.id
      ? this.estadioService.update(formValue)
      : this.estadioService.create(formValue);

      
    //  request$.subscribe(() => {
    //    this.ref.close({ saved: true });
    //  });
  }

  onCancel() {
    this.ref.close();
  }
}
