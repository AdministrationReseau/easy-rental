import React from 'react';

const Field = ({
  label = 'text',
  type = 'text',
  placeholder = '',
  size = 'w-full', // Taille par défaut
  required = false,
  // icons = false,
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
    />
  </div>
);

export default Field;
