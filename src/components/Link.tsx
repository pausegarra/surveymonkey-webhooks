import { default as NextLink } from 'next/link';

interface Props {
  href: string,
  type?: string;
  children: JSX.Element | string;
  className?: string;
}

interface typesMap {
  [key: string]: string;
}

export function Link ({ href, children, type = 'primary', className }: Props) {
  const typesMap: typesMap = {
    primary: 'bg-primary text-secondary hover:bg-transparent border border-white hover:text-white duration-200 ease-in-out'
  };

  return (
    <NextLink href={href} className={`px-4 py-2 rounded-md ${typesMap[type]} ${className}`}>
      {children}
    </NextLink>
  );
}