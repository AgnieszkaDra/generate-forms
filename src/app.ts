import { FormComponent } from './components/FormComponent';
import formFields from './fields/formFields';
import './style.css'

const form = FormComponent(formFields);
document.body.appendChild(form);


