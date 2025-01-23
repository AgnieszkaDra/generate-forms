"use strict";
// abstract class FormFieldBase {
//   label: string;
//   name: string;
//   required?: boolean;
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
//   constructor({ label, name, required }: { label: string; name: string; required?: boolean }) {
//     this.label = label;
//     this.name = name;
//     this.required = required;
//   }
//   protected initializeInput(type: string): HTMLInputElement {
//       const input = document.createElement('input');
//       input.type = type;
//       input.name = this.name;
//       input.className = 'input'
//       return input;
//     }
//     abstract createInput(): HTMLElement;
// }
// class TextField extends FormFieldBase {
//   placeholder?: string;
//   constructor({ label, name, required, placeholder }: { label: string; name: string; required?: boolean; placeholder?: string }) {
//     super({ label, name, required });
//     this.placeholder = placeholder;
//   }
//   createInput(): HTMLInputElement {
//     const input = this.initializeInput('text');
//     input.placeholder = this.placeholder || '';
//     return input;
//   }
// }
// class NumberField extends FormFieldBase {
//   placeholder?: string;
//   min?: number;
//   max?: number;
//   constructor({ label, name, required, placeholder,  min, max }: { label: string; name: string; placeholder: string,  required?: boolean; min?: number; max?: number }) {
//     super({ label, name, required });
//     this.placeholder = placeholder;
//     this.min = min;
//     this.max = max;
//   }
//   createInput(): HTMLInputElement {
//     const input = this.initializeInput('number'); 
//     input.placeholder = this.placeholder || '';
//     if (this.min !== undefined) input.min = this.min.toString();
//     if (this.max !== undefined) input.max = this.max.toString();
//     return input;
//   }
// }
// class SelectField extends FormFieldBase {
//   options: { label: string; value: string | number }[] = [];
//   constructor({
//     label,
//     name,
//     required,
//     options = [],
//   }: {
//     label: string;
//     name: string;
//     required?: boolean;
//     options?: { label: string; value: string | number }[];
//   }) {
//     super({ label, name, required });
//     this.options = options;
//     this.select = this.createInput() as HTMLSelectElement;
//   }
//   protected initializeSelect(): void {
//     this.select.innerHTML = ''; // Clear previous options
//     if (this.options.length > 0) {
//       this.options.forEach((option) => {
//         const optionElement = document.createElement('option');
//         optionElement.className = 'select__option';
//         optionElement.value = option.value.toString();
//         optionElement.textContent = option.label;
//         this.select.appendChild(optionElement);
//       });
//     } else {
//       const loadingOption = document.createElement('option');
//       loadingOption.className = 'select__option';
//       loadingOption.textContent = 'Loading...';
//       loadingOption.disabled = true;
//       loadingOption.selected = true;
//       this.select.appendChild(loadingOption);
//     }
//   }
//   async fetchOptionsFromAPI(apiUrl: string): Promise<void> {
//     try {
//       const response = await fetch(apiUrl);
//       const countries = await response.json();
//       this.options = countries.map((country: any) => ({
//         label: country.name.common,
//         value: country.cca2.toLowerCase(),
//       }));
//       this.options.sort((a, b) => a.label.localeCompare(b.label));
//       this.initializeSelect(); // Refresh select with new options
//     } catch (error) {
//       console.error('Error fetching country options:', error);
//     }
//   }
//   async populateOptions(apiUrl: string = 'https://restcountries.com/v3.1/all'): Promise<void> {
//     await this.fetchOptionsFromAPI(apiUrl);
//   }
//   createInput(): HTMLElement {
//     const select = document.createElement('select');
//     select.name = this.name;
//     select.className = 'select';
//     this.initializeSelect();
//     return select;
//   }
// }
// class Form {
//   fields: FormFieldBase[];
//   formElement: HTMLFormElement;
//   constructor(fields: FormFieldBase[]) {
//     this.fields = fields;
//     this.formElement = document.createElement('form');
//     this.formElement.className = 'form';
//   }
//   render(): HTMLFormElement {
//     this.fields.forEach(field => {
//       const input = field.createInput();
//       const label = document.createElement('label');
//       label.className = 'label';
//       label.textContent = field.label;
//       label.setAttribute('for', field.name);
//       const errorSpan = document.createElement('span');
//       errorSpan.className = 'error-message'; 
//       errorSpan.id = `${field.name}-error`;
//       const wrapper = document.createElement('div');
//       wrapper.className = 'input-wrapper';
//       wrapper.appendChild(label);
//       wrapper.appendChild(input);
//       wrapper.appendChild(errorSpan);
//       this.formElement.appendChild(wrapper);
//     });
//     const submitButton = document.createElement('button');
//     submitButton.className = 'button';
//     submitButton.type = 'submit';
//     submitButton.textContent = 'Submit';
//     this.formElement.appendChild(submitButton);
//     this.formElement.addEventListener('submit', this.handleSubmit.bind(this));
//     return this.formElement;
//   }
//   // validateForm(formData: Record<string, string | number>): Record<string, string> {
//   //   const errors: Record<string, string> = {};
//   //   this.fields.forEach(field => {
//   //     const value = formData[field.name];
//   //     if (field.required && (value === undefined || value === '')) {
//   //       errors[field.name] = `${field.label} is required.`;
//   //     }
//   //     if (field instanceof NumberField) {
//   //       const numValue = Number(value);
//   //       if (field.min !== undefined && numValue < field.min) {
//   //         errors[field.name] = `${field.label} must be at least ${field.min}.`;
//   //       }
//   //       if (field.max !== undefined && numValue > field.max) {
//   //         errors[field.name] = `${field.label} must be less than ${field.max}.`;
//   //       }
//   //     }
//   //     if (field instanceof SelectField && !value) {
//   //       errors[field.name] = `Please select a valid ${field.label}.`;
//   //     }
//   //   });
//   //   return errors;
//   // }
//   validateForm(formData: Record<string, string | number>): Record<string, string> {
//     const errors: Record<string, string> = {};
//     this.fields.forEach(field => {
//       const value = formData[field.name];
//       if (field.required && (value === undefined || value === '')) {
//         errors[field.name] = `${field.label} is required.`;
//       }
//       if (field instanceof NumberField) {
//         const numValue = Number(value);
//         if (field.min !== undefined && numValue < field.min) {
//           errors[field.name] = `${field.label} must be at least ${field.min}.`;
//         }
//         if (field.max !== undefined && numValue > field.max) {
//           errors[field.name] = `${field.label} must be less than ${field.max}.`;
//         }
//       }
//       if (field instanceof SelectField && !value) {
//         errors[field.name] = `Please select a valid ${field.label}.`;
//       }
//     });
//     return errors;
//   }
//   handleSubmit(event: SubmitEvent): void {
//     event.preventDefault();
//     const formData: Record<string, string | number> = {};
//     this.fields.forEach(field => {
//       const input = this.formElement.querySelector(`[name=${field.name}]`);
//       if (input instanceof HTMLInputElement || input instanceof HTMLSelectElement) {
//         formData[field.name] = input.value;
//       }
//     });
//     const errors = this.validateForm(formData);
//     this.fields.forEach(field => {
//       const errorElement = this.formElement.querySelector(`#${field.name}-error`);
//       if (errorElement) {
//         errorElement.textContent = '';
//       }
//     });
//     if (Object.keys(errors).length > 0) {
//       Object.entries(errors).forEach(([fieldName, errorMessage]: [string, string]) => {
//         const errorElement = this.formElement.querySelector(`#${fieldName}-error`);
//         if (errorElement) {
//           errorElement.textContent = errorMessage;
//         }
//       });
//     } else {
//       console.log('Form is valid:', formData);
//     }
//   }
// }
// (async () => {
//   const countryField = new SelectField({ label: 'Country', name: 'country', required: true });
//   await countryField.populateOptions(); 
//   const fields: FormFieldBase[] = [
//     new TextField({ label: 'Name', name: 'name', placeholder: 'Enter your name', required: true }),
//     new NumberField({ label: 'Age', name: 'age',  placeholder: 'Enter your age',min: 18, max: 99, required: true }),
//     countryField,
//   ];
//   const form = new Form(fields);
//   const root = document.querySelector('#root');
//   root?.appendChild(form.render());
// })();
class FormFieldBase {
    constructor({ label, name, required }) {
        this.label = label;
        this.name = name;
        this.required = required;
    }
    initializeInput(type) {
        const input = document.createElement('input');
        input.type = type;
        input.name = this.name;
        input.className = 'input';
        return input;
    }
}
// abstract class SelectFieldBase {
//   label: string;
//   name: string;
//   required?: boolean;
//   constructor({ label, name, required }: { label: string; name: string; required?: boolean }) {
//     this.label = label;
//     this.name = name;
//     this.required = required;
//   }
//   protected initializeSelect(): HTMLSelectElement {
//     const select = document.createElement('select');
//     select.name = this.name;
//     select.className = 'select';
//     return select;
//   }
//   abstract createSelect(): HTMLElement;
// }
class TextField extends FormFieldBase {
    constructor({ label, name, required, placeholder }) {
        super({ label, name, required });
        this.placeholder = placeholder;
    }
    createInput() {
        const input = this.initializeInput('text');
        input.placeholder = this.placeholder || '';
        return input;
    }
}
class NumberField extends FormFieldBase {
    constructor({ label, name, required, placeholder, min, max }) {
        super({ label, name, required });
        this.placeholder = placeholder;
        this.min = min;
        this.max = max;
    }
    createInput() {
        const input = this.initializeInput('number');
        input.placeholder = this.placeholder || '';
        if (this.min !== undefined)
            input.min = this.min.toString();
        if (this.max !== undefined)
            input.max = this.max.toString();
        return input;
    }
}
class SelectField extends FormFieldBase {
    constructor({ label, name, required, options = [] }) {
        super({ label, name, required });
        this.options = [];
        this.options = options;
    }
    createInput() {
        const select = document.createElement('select');
        select.name = this.name;
        select.className = 'select';
        this.initializeSelect(select);
        return select;
    }
    initializeSelect(select) {
        select.innerHTML = ''; // Clear previous options
        if (this.options.length > 0) {
            this.options.forEach((option) => {
                const optionElement = document.createElement('option');
                optionElement.className = 'select__option';
                optionElement.value = option.value.toString();
                optionElement.textContent = option.label;
                select.appendChild(optionElement);
            });
        }
        else {
            const loadingOption = document.createElement('option');
            loadingOption.className = 'select__option';
            loadingOption.textContent = 'Loading...';
            loadingOption.disabled = true;
            loadingOption.selected = true;
            select.appendChild(loadingOption);
        }
    }
    fetchOptionsFromAPI(apiUrl) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const response = yield fetch(apiUrl);
                if (!response.ok)
                    throw new Error('Failed to fetch options');
                const countries = yield response.json();
                this.options = countries.map((country) => ({
                    label: country.name.common,
                    value: country.cca2.toLowerCase(),
                }));
                this.options.sort((a, b) => a.label.localeCompare(b.label));
                // this.initializeSelect(); // Refresh select with new options
            }
            catch (error) {
                console.error('Error fetching country options:', error);
            }
        });
    }
    populateOptions(apiUrl = 'https://restcountries.com/v3.1/all') {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.fetchOptionsFromAPI(apiUrl);
        });
    }
}
class Form {
    constructor(fields) {
        this.fields = fields;
        this.formElement = document.createElement('form');
        this.formElement.className = 'form';
    }
    render() {
        this.fields.forEach((field) => {
            const input = field.createInput();
            const label = document.createElement('label');
            label.className = 'label';
            label.textContent = field.label;
            label.setAttribute('for', field.name);
            const errorSpan = document.createElement('span');
            errorSpan.className = 'error-message';
            errorSpan.id = `${field.name}-error`;
            const wrapper = document.createElement('div');
            wrapper.className = 'input-wrapper';
            wrapper.appendChild(label);
            wrapper.appendChild(input);
            wrapper.appendChild(errorSpan);
            this.formElement.appendChild(wrapper);
        });
        const submitButton = document.createElement('button');
        submitButton.className = 'button';
        submitButton.type = 'submit';
        submitButton.textContent = 'Submit';
        this.formElement.appendChild(submitButton);
        this.formElement.addEventListener('submit', this.handleSubmit.bind(this));
        return this.formElement;
    }
    validateForm(formData) {
        const errors = {};
        this.fields.forEach((field) => {
            const value = formData[field.name];
            if (field.required && (value === undefined || value === '')) {
                errors[field.name] = `${field.label} is required.`;
            }
            if (field instanceof NumberField) {
                const numValue = Number(value);
                if (field.min !== undefined && numValue < field.min) {
                    errors[field.name] = `${field.label} must be at least ${field.min}.`;
                }
                if (field.max !== undefined && numValue > field.max) {
                    errors[field.name] = `${field.label} must be less than ${field.max}.`;
                }
            }
            if (field instanceof SelectField && !value) {
                errors[field.name] = `Please select a valid ${field.label}.`;
            }
        });
        return errors;
    }
    handleSubmit(event) {
        event.preventDefault();
        const formData = {};
        this.fields.forEach((field) => {
            const input = this.formElement.querySelector(`[name=${field.name}]`);
            if (input instanceof HTMLInputElement || input instanceof HTMLSelectElement) {
                formData[field.name] = input.value;
            }
        });
        const errors = this.validateForm(formData);
        this.fields.forEach((field) => {
            const errorElement = this.formElement.querySelector(`#${field.name}-error`);
            if (errorElement) {
                errorElement.textContent = '';
            }
        });
        if (Object.keys(errors).length > 0) {
            Object.entries(errors).forEach(([fieldName, errorMessage]) => {
                const errorElement = this.formElement.querySelector(`#${fieldName}-error`);
                if (errorElement) {
                    errorElement.textContent = errorMessage;
                }
            });
        }
        else {
            console.log('Form is valid:', formData);
        }
    }
}
// Usage
(() => __awaiter(void 0, void 0, void 0, function* () {
    const countryField = new SelectField({ label: 'Country', name: 'country', required: true });
    yield countryField.populateOptions();
    const fields = [
        new TextField({ label: 'Name', name: 'name', placeholder: 'Enter your name', required: true }),
        new NumberField({ label: 'Age', name: 'age', placeholder: 'Enter your age', min: 18, max: 99, required: true }),
        countryField,
    ];
    const form = new Form(fields);
    const root = document.querySelector('#root');
    root === null || root === void 0 ? void 0 : root.appendChild(form.render());
}))();
//# sourceMappingURL=app.js.map