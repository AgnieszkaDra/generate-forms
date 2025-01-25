import { FormField } from '../types/InputField';

export const validateForm = (fields: FormField[], formData: Record<string, string | number>): string[] => {
  const errors: string[] = [];

  fields.forEach(field => {
    const value = formData[field.name];

    if (field.required && (value === undefined || value === '')) {
      errors.push(`${field.label} is required.`);
    }

    if (field.type === 'number') {
      const numValue = Number(value);
      if (field.min && numValue < field.min) {
        errors.push(`${field.label} must be at least ${field.min}.`);
      }
      if (field.max && numValue > field.max) {
        errors.push(`${field.label} must be less than ${field.max}.`);
      }
    }

    if (field.type === 'select' && !value) {
      errors.push(`Please select a valid ${field.label}.`);
    }
  });

  return errors;
}

export default validateForm