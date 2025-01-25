import { SelectField } from '../../types/InputField';

const createSelectField = (field: SelectField): HTMLSelectElement => {
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

export default createSelectField;