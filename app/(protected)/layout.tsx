import React, { ReactNode } from 'react';

const ProtectedLayout = ({ children }: Readonly<{ children: ReactNode }>) => {
  return <div>{children}</div>;
};

export default ProtectedLayout;
