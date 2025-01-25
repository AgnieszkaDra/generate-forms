import { InputField } from './types/InputField';
import { ButtonField } from './types/ButtonField';
import { FormComponent } from './components/FormComponent';
import './style.css'
import inputFields from './fields/inputField';
import buttonFields from './fields/buttonFields';

// const fields: InputField[] = [
//   { type: 'text', label: 'Name', name: 'name', placeholder: 'Enter your name', required: true },
//   { type: 'number', label: 'Age', name: 'age', min: 18, max: 99, required: true },
//   {
//     type: 'select',
//     label: 'Country',
//     name: 'country',
//     options: [
//       { label: 'United States', value: 'us' },
//       { label: 'Canada', value: 'ca' },
//       { label: 'United Kingdom', value: 'uk' }
//     ],
//     required: true
//   }
// ];

// export const buttons: ButtonField[] = [
//   { type: 'submit', name: 'Send'},
//   { type: 'reset', name: 'Reset'},
// ];



const form = FormComponent(inputFields, buttonFields);
document.body.appendChild(form);


