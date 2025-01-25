import { InputField, TextField, NumberField, SelectField } from '../types/InputField';
import '../../src/style.css';

const createWrapperForInput = (field: InputField): HTMLDivElement => {
  const wrapper = document.createElement('div');
  
  const label = document.createElement('label');
  label.className = 'label';
  label.textContent = field.label;
  label.setAttribute('for', field.name);
  wrapper.appendChild(label);

  const errorSpan = document.createElement('span');
  errorSpan.className = 'error-message';
  errorSpan.id = `${field.name}-error`;
  wrapper.appendChild(errorSpan);

  return wrapper;
};


export const createTextField = (field: TextField): HTMLDivElement => {
  const wrapper = createWrapperForInput(field);

  const input = document.createElement('input');
  input.className = 'input';
  input.type = 'text';
  input.placeholder = field.placeholder ?? '';
  input.name = field.name;

  wrapper.insertBefore(input, wrapper.querySelector('.error-message'));

  return wrapper;
};

export const createNumberField = (field: NumberField): HTMLDivElement => {
  const wrapper = createWrapperForInput(field);

  const input = document.createElement('input');
  input.className = 'input';
  input.type = 'number';
  if (field.min !== undefined) input.min = field.min.toString();
  if (field.max !== undefined) input.max = field.max.toString();
  input.name = field.name;

  wrapper.insertBefore(input, wrapper.querySelector('.error-message'));

  return wrapper;
};

export const createSelectField = (field: SelectField): HTMLDivElement => {
  const wrapper = createWrapperForInput(field);

  const select = document.createElement('select');
  select.className = 'select';
  select.name = field.name;

  field.options.forEach((option) => {
    const optionElement = document.createElement('option');
    optionElement.value = option.value.toString();
    optionElement.textContent = option.label;
    select.appendChild(optionElement);
  });

  wrapper.insertBefore(select, wrapper.querySelector('.error-message'));

  return wrapper;
};

export const createInputForField = (field: InputField): HTMLDivElement => {
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