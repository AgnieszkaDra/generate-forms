export const formFields = [
    { category: 'input', type: 'text', label: 'Name', name: 'name', placeholder: 'Enter your name', required: true },
    { category: 'input', type: 'number', label: 'Age', name: 'age', min: 18, max: 99, required: true },
    {
        category: 'input',
        type: 'select',
        label: 'Country',
        name: 'country',
        options: [
            { label: 'United States', value: 'us' },
            { label: 'Canada', value: 'ca' },
            { label: 'United Kingdom', value: 'uk' }
        ],
        required: true
    }
];
export default formFields;
//# sourceMappingURL=formFields.js.map