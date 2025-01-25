import { InputField, TextField, NumberField, SelectField } from '../types/InputField';
import '../../src/style.css'

export const createTextField = (field: TextField): HTMLInputElement => {
  const input = document.createElement('input');
  input.className = 'input';
  input.type = 'text';
  input.placeholder = field.placeholder ?? '';
  input.name = field.name;
  return input;
};

export const createNumberField = (field: NumberField): HTMLInputElement => {
  const input = document.createElement('input');
  input.className = 'input';
  input.type = 'number';
  if (field.min !== undefined) input.min = field.min.toString();
  if (field.max !== undefined) input.max = field.max.toString();
  input.name = field.name;
  return input;
};

export const createSelectField = (field: SelectField): HTMLSelectElement => {
  const select = document.createElement('select');
  select.className = 'select';
  field.options.forEach(option => {
    const optionElement = document.createElement('option');
    optionElement.value = option.value.toString();
    optionElement.textContent = option.label;
    select.appendChild(optionElement);
  });
  select.name = field.name;
  return select;
};

export const createInputForField = (field: InputField): HTMLElement => {
  switch (field.type) {
    case 'text':
      return createTextField(field as TextField);
    case 'number':
      return createNumberField(field as NumberField);
    case 'select':
      return createSelectField(field as SelectField);
    default:
      throw new Error(`Unsupported field type: ${(field as InputField).type}`);
  }
};

export default {
  createTextField,
  createNumberField,
  createSelectField,
  createInputForField,
};