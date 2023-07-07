"use client";

import { InputContainer } from './InputContainer';

interface Props {
  label?: string;
  placeholder?: string;
  name: string;
  type?: string;
  required?: boolean;
  children?: JSX.Element;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  value?: string;
}

export function TextInput ({ label, placeholder, name, type = "text", required = true, children, onChange, value }: Props) {
  return (
    <InputContainer>
      <>
        <label className='text-primary' htmlFor="name">{label}</label>
        <input value={value} required={required} type={type} onChange={onChange} className='text-primary bg-black border border-primary rounded-md px-2 py-1' placeholder={placeholder} id={name} name={name} />
        {children}
      </>
    </InputContainer>
  );
}