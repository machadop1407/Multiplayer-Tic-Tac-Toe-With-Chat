import React, { FC, ReactNode } from 'react';

export type CardBodyProps = {
  children?: ReactNode;
  /** Additional card class name */
  className?: string;
};

export const CardBody: FC<CardBodyProps> = ({ className = '', children }) => {
  return <div className={`mml-card-body ${className}`}>{children}</div>;
};
