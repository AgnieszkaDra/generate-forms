import { ButtonField, SubmitField } from '../types/ButtonField';
import { InputField, TextField, NumberField, SelectField } from '../types/InputField';

export function isSubmitField(field: ButtonField): field is SubmitField {
  return field.type === 'submit';
}

export function isInputField(field: any): field is InputField {
  return 'type' in field && (field.type === 'text' || field.type === 'number' || field.type === 'select');
}