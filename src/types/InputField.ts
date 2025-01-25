export type FormFieldBase = {
    category: 'input';
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

  export type ButtonElement = FormFieldBase & {
    type: 'select';
    options: { label: string; value: string | number }[];
  };
  
  export type InputField = TextField | NumberField | SelectField;