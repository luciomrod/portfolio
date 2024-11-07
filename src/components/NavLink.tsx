import React from 'react';

interface NavLinkProps {
  href: string;
  children: React.ReactNode;
}

const NavLink: React.FC<NavLinkProps> = ({ href, children }) => {
  return (
    <a
      href={href}
      className="text-zinc-400 hover:text-white transition-colors duration-200"
    >
      {children}
    </a>
  );
};

export default NavLink;