import { Component, EventEmitter, Input, Output, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTabsModule } from '@angular/material/tabs';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { CrudFormComponent } from '../crud-form/crud-form.component';
import { TabConfig } from '../models/form-field/form-field.model';

@Component({
  selector: 'app-tabbed-crud-form',
  standalone: true,
  imports: [
    CommonModule,
    MatTabsModule,
    MatButtonModule,
    MatIconModule,
    CrudFormComponent
  ],
  template: `
    <div class="tabbed-crud-container">
      <mat-tab-group [(selectedIndex)]="selectedTabIndex">
        <mat-tab *ngFor="let tab of tabs; let i = index" [label]="tab.title">
          <div class="tab-content">
            <app-crud-form
              [fields]="tab.fields"
              [initialData]="getTabData(i)"
              [readOnly]="readOnly"
              (save)="onTabSave($event, i)"
              (cancel)="onCancel()">
            </app-crud-form>
          </div>
        </mat-tab>
      </mat-tab-group>

      <!-- Botões de ação centralizados -->
      <div class="tabbed-crud-actions">
        <button mat-raised-button color="primary" (click)="saveAll()" [disabled]="readOnly">
          <mat-icon>save</mat-icon>
          Salvar
        </button>
        <button mat-raised-button (click)="cancelAll()">
          <mat-icon>cancel</mat-icon>
          Cancelar
        </button>
        <button mat-raised-button color="warn" (click)="deleteRecord()" *ngIf="showDelete" [disabled]="readOnly">
          <mat-icon>delete</mat-icon>
          Excluir
        </button>
      </div>
    </div>
  `,
  styles: [`
    .tabbed-crud-container {
      padding: 16px;
      background-color: #fff;
      border-radius: 8px;
      box-shadow: 0 2px 4px rgba(0,0,0,0.1);
    }

    .tab-content {
      padding: 24px 16px;
      min-height: 300px;
    }

    .tabbed-crud-actions {
      display: flex;
      gap: 12px;
      justify-content: flex-start;
      padding: 16px;
      border-top: 1px solid #e0e0e0;
      margin-top: 16px;
    }

    ::ng-deep .mat-mdc-tab-body-content {
      overflow: visible !important;
    }
  `]
})
export class TabbedCrudFormComponent implements OnChanges {
  @Input() tabs: TabConfig[] = [];
  @Input() initialData: any = {};
  @Input() readOnly = false;
  @Input() showDelete = true;

  @Output() save = new EventEmitter<any>();
  @Output() cancel = new EventEmitter<void>();
  @Output() delete = new EventEmitter<void>();

  selectedTabIndex = 0;
  private tabsData: any[] = [];

  ngOnChanges(changes: SimpleChanges) {
    if (changes['tabs'] || changes['initialData']) {
      this.initializeTabsData();
    }
  }

  private initializeTabsData() {
    // Inicializa os dados de cada aba
    this.tabsData = this.tabs.map(() => ({}));
    
    // Preenche com dados iniciais se houver
    if (this.initialData && Object.keys(this.initialData).length > 0) {
      this.tabs.forEach((tab, index) => {
        const tabData: any = {};
        tab.fields.forEach(field => {
          if (this.initialData[field.key] !== undefined) {
            tabData[field.key] = this.initialData[field.key];
          }
        });
        this.tabsData[index] = tabData;
      });
    }
  }

  getTabData(tabIndex: number): any {
    return this.tabsData[tabIndex] || {};
  }

  onTabSave(data: any, tabIndex: number) {
    // Armazena os dados da aba
    this.tabsData[tabIndex] = data;
  }

  saveAll() {
    // Mescla todos os dados das abas em um único objeto
    const allData = this.tabsData.reduce((acc, tabData) => {
      return { ...acc, ...tabData };
    }, {});

    this.save.emit(allData);
  }

  cancelAll() {
    this.cancel.emit();
  }

  onCancel() {
    // Não emite cancel automaticamente quando é do form interno
    // Apenas quando o usuário clicar no botão "Cancelar"
  }

  deleteRecord() {
    this.delete.emit();
  }
}
