import React, { FC } from 'react';

export type SuccessProps = { success?: string };

export const Success: FC<SuccessProps> = ({ success }) => {
  if (success) return <div className="mml-success">{success}</div>;

  return null;
};
