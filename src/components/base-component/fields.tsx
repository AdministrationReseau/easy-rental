import React from 'react';

interface FieldProps {
  label?: string;
  type?: string;
  placeholder?: string;
  size?: string;
  required?: boolean;
  onChange?: React.ChangeEventHandler<HTMLInputElement>; // Ajout de onChange
}

const Field: React.FC<FieldProps> = ({
  label = 'text',
  type = 'text',
  placeholder = '',
  size = 'w-full',
  required = false,
  onChange, // Nouvelle prop
}) => (
  <div className={`mb-4.5 ${size}`}>
    <label className="mb-3 block text-sm font-medium text-black dark:text-white">
      <b>{label}</b> {required && <span className="text-meta-1">*</span>}
    </label>
    <input
      type={type}
      placeholder={placeholder}
      className="w-full rounded-[10px] border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
      required={required}
      onChange={onChange} // Passer la prop onChange au champ input
    />
  </div>
);

export default Field;
