import { InputContainer } from './InputContainer';

interface Props {
  options: Option[];
  label?: string;
  name?: string;
  required?: boolean;
  children?: JSX.Element;
  onChange?: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  value?: string;
}

export function SelectInput ({ options = [], label, name, required = true, children, onChange, value }: Props) {
  return (
    <InputContainer>
      <>
        <label htmlFor={name} className='text-primary'>{label}</label>
        <select onChange={onChange} required={required} value={value} className='text-primary bg-black border border-primary rounded-md px-2 py-1.5' name={name} id={name}>
          <option value="">Select one...</option>
          {options.map((option: Option) => <option key={option.value} value={option.value}>{option.label}</option>)}
        </select>
        {children}
      </>
    </InputContainer>
  );
}