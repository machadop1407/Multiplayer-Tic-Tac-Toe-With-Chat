import React, { FC } from 'react';

export type ErrorProps = {
  /** The error message */
  error?: string;
};

export const Error: FC<ErrorProps> = ({ error = '' }) => {
  if (!error) return null;
  return <span className="mml-error">{error}</span>;
};
