interface Props {
  type?: "button" | "submit" | "reset";
  children: JSX.Element | string;
  className?: string;
  onClick?: () => void;
  theme?: string;
}

interface typesMap {
  [key: string]: string;
}

export function Button ({ children, type = "button", className, onClick, theme = 'primary' }: Props) {
  const typesMap: typesMap = {
    primary: 'bg-primary text-secondary hover:bg-transparent border border-white hover:text-white',
    danger: 'bg-red-500 px-4 py-2 rounded-md hover:bg-red-900 duration-200 ease-in-out cursor-pointer'
  };

  return (
    <button type={type} className={`px-4 py-2 rounded-md duration-200 ease-in-out ${typesMap[theme]} ${className}`} onClick={onClick}>
      {children}
    </button>
  );
}