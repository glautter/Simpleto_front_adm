export type FieldType = 'text' | 'number' | 'date' | 'select' | 'textarea' | 'checkbox' | 'email' | 'tel';

export interface FormField {
  key: string;              // property name
  label: string;            // label to show
  type: FieldType;          // input type
  size?: number;            // visual size (cols or px hint)
  options?: { value: any; label: string }[]; // for select
  disabled?: boolean;       // is disabled
  visible?: boolean;        // is visible
  required?: boolean;       // required validator
  mask?: 'cpf' | 'phone' | 'cep' | string; // optional mask hint
  rows?: number;            // for textarea
  validators?: any[];       // extra validators (angular validators)
  errorMessage?: string;    // custom error message
  placeholder?: string; 
}
export interface TabConfig {
  title: string;
  fields: FormField[];
}

export interface TabbedFormConfig {
  tabs: TabConfig[];
}
export interface MainFormWithTabsConfig {
  mainFields: FormField[];  // Campos do formulário principal (sem aba)
  tabs: TabConfig[];         // Abas adicionais
}