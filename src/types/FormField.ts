export type FormFieldBase = {
    label: string;
    name: string;
    required?: boolean;
  };
  
  export type TextField = FormFieldBase & {
    type: 'text';
    placeholder?: string;
  };
  
  export type NumberField = FormFieldBase & {
    type: 'number';
    min?: number;
    max?: number;
  };
  
  export type SelectField = FormFieldBase & {
    type: 'select';
    options: { label: string; value: string | number }[];
  };
  
  export type FormField = TextField | NumberField | SelectField;