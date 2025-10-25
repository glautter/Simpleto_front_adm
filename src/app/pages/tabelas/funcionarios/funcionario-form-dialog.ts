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
  ) {}

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

// ============================================
// EXEMPLO DE USO NO COMPONENTE PAI
// ============================================

/*
import { MatDialog } from '@angular/material/dialog';
import { FuncionarioDialogComponent } from './funcionario-dialog/funcionario-dialog.component';

export class ListaFuncionariosComponent {
  constructor(private dialog: MatDialog) {}

  abrirCadastro() {
    const dialogRef = this.dialog.open(FuncionarioDialogComponent, {
      width: '90vw',
      maxWidth: '1200px',
      data: {
        title: 'Novo Funcionário',
        initial: {}
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        console.log('Funcionário cadastrado:', result);
        // Chamar serviço para salvar no backend
      }
    });
  }

  editarFuncionario(funcionario: any) {
    const dialogRef = this.dialog.open(FuncionarioDialogComponent, {
      width: '90vw',
      maxWidth: '1200px',
      data: {
        title: 'Editar Funcionário',
        initial: funcionario
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        console.log('Funcionário atualizado:', result);
        // Chamar serviço para atualizar no backend
      }
    });
  }
}
*/