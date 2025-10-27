// funcionario-dialog.component.ts
import { Component, Inject, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FuncionarioFormComponent } from './funcionario-form';

@Component({
  selector: 'app-funcionario-dialog',
  standalone: true,
  imports: [CommonModule, FuncionarioFormComponent],
  templateUrl: './funcionario-form-dialog.html',
  styleUrls: ['./funcionario-form-dialog.scss']
})
export class FuncionarioDialogComponent {
  @ViewChild('formComp') formComp!: FuncionarioFormComponent;

  constructor(
    public dialogRef: MatDialogRef<FuncionarioDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  saveFromChild() {
    this.formComp?.submit();
  }

  onSave(data: any) {
    console.log('Salvando funcionário:', data);
    this.dialogRef.close(data);
  }

  onCancel() {
    this.dialogRef.close();
  }
  onDelete(item: any) {
    this.dialogRef = this.data.filter((d: any) => d.abreviacao !== item.abreviacao);
  }

}

