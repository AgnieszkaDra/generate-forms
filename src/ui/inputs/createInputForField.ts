import { InputField, TextField, NumberField, SelectField } from '../../types/InputField';
import { createTextField, createNumberField, createSelectField } from './index';

const createInputForField = (field: InputField): HTMLElement => {
  switch (field.type) {
    case 'text':
      return createTextField(field as TextField);
    case 'number':
      return createNumberField(field as NumberField);
    case 'select':
      return createSelectField(field as SelectField);
    default:
      throw new Error(`Unsupported field type: ${field}`);
  }
};

export default createInputForField;