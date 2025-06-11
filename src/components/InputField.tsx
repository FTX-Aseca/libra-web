import React from "react";

interface InputFieldProps {
  id: string;
  label: string;
  type: string;
  placeholder: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  icon: React.ReactNode;
  required?: boolean;
}

const InputField: React.FC<InputFieldProps> = ({
  id,
  label,
  type,
  placeholder,
  value,
  onChange,
  icon,
  required = false,
}) => {
  return (
    <div>
      <label className="block text-gray-400 mb-1" htmlFor={id}>
        {label}
      </label>
      <div className="flex items-center bg-[#183232] rounded-lg px-3 py-2">
        {icon}
        <input
          id={id}
          type={type}
          className="bg-transparent outline-none text-white flex-1 placeholder:text-gray-300 ml-2"
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          required={required}
        />
      </div>
    </div>
  );
};

export default InputField;
