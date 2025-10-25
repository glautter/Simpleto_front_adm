import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

export interface ColumnDef {
  key: string;
  title: string;
  width?: string;
}

@Component({
  selector: 'app-list-base',
  standalone: true,
  templateUrl: './list-base.component.html',
  styleUrls: ['./../base-css/base.component.scss'],
  imports: [CommonModule, FormsModule]
})
export class ListBaseComponent<T = any> {
  // optional title to show in header
  @Input() title: string = '';
  @Input() pageSize = 10;
  @Input() columns: ColumnDef[] = [];
  @Input() data: T[] = [];

  // Control which action buttons show
  @Input() showAdd = true;
  @Input() showEdit = true;
  @Input() showDelete = true;
  @Input() showPrint = false;

  @Output() add = new EventEmitter<void>();
  @Output() edit = new EventEmitter<T>();
  @Output() delete = new EventEmitter<T>();
  @Output() print = new EventEmitter<void>();

  filterText = '';
  page = 1;

  get filtered() {
    const q = this.filterText?.toLowerCase()?.trim();
    if (!q) return this.data || [];
    return (this.data || []).filter(row => {
      return this.columns.some(col => {
        const v = String((row as any)[col.key] ?? '').toLowerCase();
        return v.indexOf(q) !== -1;
      });
    });
  }

  get paged() {
    const all = this.filtered;
    const start = (this.page - 1) * this.pageSize;
    return all.slice(start, start + this.pageSize);
  }

  get totalPages() {
    return Math.max(1, Math.ceil((this.filtered?.length || 0) / this.pageSize));
  }

  goto(page: number) {
    this.page = Math.min(this.totalPages, Math.max(1, page));
  }

  // helper used from template to safely access dynamic keys
  getValue(row: any, key: string) {
    try { return row?.[key]; } catch { return '' }
  }

  onAdd() { this.add.emit(); }
  onEdit(row: T) { this.edit.emit(row); }
  onDelete(row: T) { this.delete.emit(row); }
  onPrint() { this.print.emit(); }
}
