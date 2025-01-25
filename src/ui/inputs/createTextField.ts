import { TextField } from '../../types/InputField';

const createTextField = (field: TextField): HTMLInputElement => {
  const input = document.createElement('input');
  input.className = 'input';
  input.type = 'text';
  input.placeholder = field.placeholder ?? '';
  input.name = field.name;
  return input;
};

export default createTextField;