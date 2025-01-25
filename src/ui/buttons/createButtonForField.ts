import { ButtonField, SubmitField } from '../../types/ButtonField';
import createSubmitField from './createSubmitField';

const createButtonForField = (field: ButtonField): HTMLElement => {
  switch (field.type) {
    case 'submit':
      return createSubmitField(field as SubmitField);
    default:
      throw new Error(`Unsupported field type: ${field}`);
  }
};

export default createButtonForField;