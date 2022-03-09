import React, { FC, ReactNode } from 'react';

export type CardProps = {
  children?: ReactNode;
  /** Additional card class name */
  className?: string;
};

export const Card: FC<CardProps> = ({ className = '', children }) => {
  return <div className={`mml-card ${className}`}>{children}</div>;
};
