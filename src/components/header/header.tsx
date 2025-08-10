import React, { ReactNode } from 'react';
import "./header.scss";

interface HeaderProps {
  children: ReactNode;
}

const Header: React.FC<HeaderProps> = ({ children }) => {
  return (
    <header className="header">
      {children}
    </header>
  );
};

export default Header;
