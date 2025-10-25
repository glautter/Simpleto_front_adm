import { Component, Inject, ViewChild } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { PacienteFormComponent } from './paciente-form';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatButtonModule} from '@angular/material/button';
import {MatSelectModule} from '@angular/material/select';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatNativeDateModule} from '@angular/material/core';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatRadioModule} from '@angular/material/radio';
import {MatTooltipModule} from '@angular/material/tooltip'; 

@Component({
  selector: 'app-paciente-form-dialog',
  standalone: true,
  imports: [CommonModule, PacienteFormComponent, MatInputModule, MatFormFieldModule, MatButtonModule, MatSelectModule, MatDatepickerModule, MatNativeDateModule, MatCheckboxModule, MatRadioModule, MatTooltipModule],
  templateUrl: './paciente-form-dialog.html',
  styleUrls: ['./paciente-form-dialog.css']
})
export class PacienteFormDialogComponent {
  @ViewChild('formComp') formComp!: PacienteFormComponent;

  constructor(public dialogRef: MatDialogRef<PacienteFormDialogComponent>, @Inject(MAT_DIALOG_DATA) public data: any) {}
  // Called when child emits save
  onSave(payload: any) { this.dialogRef.close({ saved: true, payload }); }
  onCancel() { this.dialogRef.close({ saved: false }); }

  // Trigger child submit by clicking the submit button inside the dialog
  saveFromChild() {
    // call the child's submit() method (PacienteFormComponent exposes submit())
    if (this.formComp && typeof this.formComp.submit === 'function') {
      this.formComp.submit();
    }
  }
}
