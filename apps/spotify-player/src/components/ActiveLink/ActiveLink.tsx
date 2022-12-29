import Link from 'next/link';
import { useRouter } from 'next/router';
import { ReactNode } from 'react';

interface ActiveLinkProps {
  children: ReactNode;
  activeClassName: string;
  href: string;
  className: string;
}
/** Add the `activeClassName` if the link href === the current URL */
export default function ActiveLink({ children, activeClassName, ...props }: ActiveLinkProps) {
  const { pathname } = useRouter();

  const className = pathname === props.href ? `${props.className} ${activeClassName}`.trim() : props.className;

  return (
    <Link {...props} className={className}>
      {children}
    </Link>
  );
}
