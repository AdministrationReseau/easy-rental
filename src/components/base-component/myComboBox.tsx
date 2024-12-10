import React from 'react';

const MyComboBox = ({
  label = 'text',
  size = 'w-full', // Taille par défaut
  required = false,
  // icons = false,
}) => (
  <div className={` ${size} mb-4`}>
    <label className="mb-3 block text-sm font-medium text-black dark:text-white">
      {label} {required && <span className="text-meta-1">*</span>}
    </label>
    <label className="flex items-center cursor-pointer">
                        <input
                            type="radio"
                            name="payment-option"
                            value="client"
                            // checked={selectedValue === "client"}
                            // onChange={() => handleChange(option.name)}
                            className="w-5 h-5 text-primary-blue focus:ring-primary-blue focus:ring-2"
                        />
                        <span className="ml-3 font-medium">Client</span>
                    </label>
                    <label className="flex items-center cursor-pointer">
                        <input
                            type="radio"
                            name="payment-option"
                            value="Organisation"
                            // checked={selectedValue === option.name}
                            // onChange={() => handleChange(option.name)}
                            className="w-5 h-5 text-primary-blue focus:ring-primary-blue focus:ring-2"
                        />
                        <span className="ml-3 font-medium">Organisation</span>
                    </label>
  </div>
);

export default MyComboBox;
