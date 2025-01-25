import { InputField } from "../types/InputField";
import validateForm from "./validateForm";

export const submitForm = (form: HTMLFormElement, inputs: InputField[]): void => {
    form.addEventListener('submit', (event) => {
      event.preventDefault();
       
      const formData: Record<string, string | number> = {};
      inputs.forEach((element) => {
        const input = form.querySelector(`[name=${element.name}]`);
        if (input instanceof HTMLInputElement || input instanceof HTMLSelectElement) {
          formData[element.name] = input.value;
        }
      });
  
      const errors = validateForm(inputs, formData, form);
  
      if (errors.length > 0) {
        console.error('Form validation errors:', errors);
      } else {
        console.log('Form is valid:', formData);
      }
    });
  };
  