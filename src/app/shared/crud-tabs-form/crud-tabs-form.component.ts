// crud-tabs-form.component.ts
import { Component, EventEmitter, Input, Output, OnChanges, SimpleChanges, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CrudFormComponent } from '../crud-form/crud-form.component';
import { CrudTab, CrudTabsConfig } from '../models/crud-tabs-form/crud-tabs-form.model';
import { FormField } from '../models/form-field/form-field.model';

@Component({
  selector: 'app-crud-tabs-form',
  standalone: true,
  imports: [CommonModule, CrudFormComponent, ReactiveFormsModule],
  templateUrl: './crud-tabs-form.component.html',
  styleUrls: ['./../base-css/base.component.scss', './crud-tabs-form.component.scss']
})
export class CrudTabsFormComponent implements OnChanges {
  @Input() config: CrudTabsConfig = { tabs: [] };
  @Input() initialData: any = {};
  @Input() readOnly = false;

  @Output() save = new EventEmitter<any>();
  @Output() cancel = new EventEmitter<void>();
  @Output() tabChange = new EventEmitter<string>();

  @ViewChild('crudForm') crudForm!: CrudFormComponent;

  activeTabId: string = '';
  currentFields: FormField[] = [];
  allFormData: any = {};

  constructor(private fb: FormBuilder) { }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['config'] && this.config?.tabs?.length > 0) {
      // Define a primeira aba como ativa
      if (!this.activeTabId || !this.config.tabs.find(t => t.id === this.activeTabId)) {
        this.activeTabId = this.config.tabs[0].id;
      }
      this.loadTab(this.activeTabId);
    }

    if (changes['initialData']) {
      this.allFormData = { ...this.initialData };
    }
  }

  selectTab(tabId: string) {
    if (this.activeTabId === tabId) return;

    // Salva dados da aba atual antes de trocar
    this.saveCurrentTabData();

    this.activeTabId = tabId;
    this.loadTab(tabId);
    this.tabChange.emit(tabId);
  }

  private loadTab(tabId: string) {
    const tab = this.config.tabs.find(t => t.id === tabId);
    if (!tab) return;

    this.currentFields = tab.fields;
  }

  private saveCurrentTabData() {
    if (this.crudForm?.form) {
      const currentData = this.crudForm.form.getRawValue();
      this.allFormData = { ...this.allFormData, ...currentData };
    }
  }

  onSaveTab(data: any) {
    // Atualiza os dados da aba atual
    this.allFormData = { ...this.allFormData, ...data };
  }

  submit() {
    // Força validação da aba atual
    if (this.crudForm?.form.invalid) {
      this.crudForm.form.markAllAsTouched();
      return;
    }

    // Salva dados da aba atual
    this.saveCurrentTabData();

    // Valida todas as abas
    const isValid = this.validateAllTabs();

    if (!isValid) {
      alert('Por favor, preencha todos os campos obrigatórios em todas as abas.');
      return;
    }

    this.save.emit(this.allFormData);
  }

  private validateAllTabs(): boolean {
    // Aqui você pode implementar validação customizada
    // Por enquanto, retorna true
    return true;
  }

  doCancel() {
    this.cancel.emit();
  }

  isTabActive(tabId: string): boolean {
    return this.activeTabId === tabId;
  }

  getTabByIndex(index: number): CrudTab | undefined {
    return this.config.tabs[index];
  }
}