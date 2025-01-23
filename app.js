"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
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
    constructor({ label, name, required, min, max }) {
        super({ label, name, required });
        this.min = min;
        this.max = max;
    }
    createInput() {
        const input = this.initializeInput('number');
        if (this.min !== undefined)
            input.min = this.min.toString();
        if (this.max !== undefined)
            input.max = this.max.toString();
        return input;
    }
}
// class SelectField extends FormFieldBase {
//   options: { label: string; value: string | number }[];
//   constructor({ label, name, required, options }: { label: string; name: string; required?: boolean; options: { label: string; value: string | number }[] }) {
//     super({ label, name, required });
//     this.options = options;
//   }
//   createInput(): HTMLSelectElement {
//     const select = document.createElement('select');
//     select.className = 'select';
//     select.name = this.name;
//     this.options.forEach(option => {
//       const optionElement = document.createElement('option');
//       optionElement.value = option.value.toString();
//       optionElement.textContent = option.label;
//       select.appendChild(optionElement);
//     });
//     return select;
//   }
// }
class SelectField extends FormFieldBase {
    constructor({ label, name, required, options }) {
        super({ label, name, required });
        this.options = [];
        if (options) {
            this.options = options;
        }
    }
    fetchOptionsFromAPI(apiUrl) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const response = yield fetch(apiUrl);
                const countries = yield response.json();
                this.options = countries.map((country) => ({
                    label: country.name.common,
                    value: country.cca2.toLowerCase(), // Use the country code as the value
                }));
            }
            catch (error) {
                console.error('Error fetching country options:', error);
            }
        });
    }
    createInput() {
        const select = document.createElement('select');
        select.className = 'select';
        select.name = this.name;
        if (this.options.length > 0) {
            this.options.forEach(option => {
                const optionElement = document.createElement('option');
                optionElement.value = option.value.toString();
                optionElement.textContent = option.label;
                select.appendChild(optionElement);
            });
        }
        else {
            const loadingOption = document.createElement('option');
            loadingOption.textContent = 'Loading...';
            loadingOption.disabled = true;
            loadingOption.selected = true;
            select.appendChild(loadingOption);
        }
        return select;
    }
    populateOptions() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.fetchOptionsFromAPI('https://restcountries.com/v3.1/all');
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
        this.fields.forEach(field => {
            const input = field.createInput();
            const label = document.createElement('label');
            label.className = 'label';
            label.textContent = field.label;
            label.setAttribute('for', field.name);
            const wrapper = document.createElement('div');
            wrapper.appendChild(label);
            wrapper.appendChild(input);
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
        const errors = [];
        this.fields.forEach(field => {
            const value = formData[field.name];
            if (field.required && (value === undefined || value === '')) {
                errors.push(`${field.label} is required.`);
            }
            if (field instanceof NumberField) {
                const numValue = Number(value);
                if (field.min !== undefined && numValue < field.min) {
                    errors.push(`${field.label} must be at least ${field.min}.`);
                }
                if (field.max !== undefined && numValue > field.max) {
                    errors.push(`${field.label} must be less than ${field.max}.`);
                }
            }
            if (field instanceof SelectField && !value) {
                errors.push(`Please select a valid ${field.label}.`);
            }
        });
        return errors;
    }
    handleSubmit(event) {
        event.preventDefault();
        const formData = {};
        this.fields.forEach(field => {
            const input = this.formElement.querySelector(`[name=${field.name}]`);
            if (input instanceof HTMLInputElement || input instanceof HTMLSelectElement) {
                formData[field.name] = input.value;
            }
        });
        const errors = this.validateForm(formData);
        if (errors.length > 0) {
            console.log('Form validation errors:', errors);
        }
        else {
            console.log('Form is valid:', formData);
        }
    }
}
// const fields: FormFieldBase[] = [
//   new TextField({ label: 'Name', name: 'name', placeholder: 'Enter your name', required: true }),
//   new NumberField({ label: 'Age', name: 'age', min: 18, max: 99, required: true }),
//   new SelectField({
//     label: 'Country',
//     name: 'country',
//     required: true,
//     options: [
//       { label: 'United States', value: 'us' },
//       { label: 'Canada', value: 'ca' },
//       { label: 'United Kingdom', value: 'uk' }
//     ]
//   })
// ];
// const form = new Form(fields);
// const root = document.querySelector('#root');
// root?.appendChild(form.render());
(() => __awaiter(void 0, void 0, void 0, function* () {
    const countryField = new SelectField({ label: 'Country', name: 'country', required: true });
    yield countryField.populateOptions(); // Populate the options dynamically
    const fields = [
        new TextField({ label: 'Name', name: 'name', placeholder: 'Enter your name', required: true }),
        new NumberField({ label: 'Age', name: 'age', min: 18, max: 99, required: true }),
        countryField,
    ];
    const form = new Form(fields);
    const root = document.querySelector('#root');
    root === null || root === void 0 ? void 0 : root.appendChild(form.render());
}))();
