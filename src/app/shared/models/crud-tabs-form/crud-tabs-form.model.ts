// models/crud-tabs-form.model.ts
import { FormField } from '../form-field/form-field.model';

export interface CrudTab {
  id: string;
  label: string;
  icon?: string;
  fields: FormField[];
  disabled?: boolean;
}

export interface CrudTabsConfig {
  tabs: CrudTab[];
  showTabsOnTop?: boolean; // true = tabs no topo, false = tabs na lateral
}