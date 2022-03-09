import React, { FC } from 'react';

import { Icon } from './Icon';

export type CardHeaderProps = {
  /** Header text */
  text: string;
  /** The name of the material icon, see https://material.io/resources/icons/ */
  icon?: string;
  /** Additional card class name */
  className?: string;
};

export const CardHeader: FC<CardHeaderProps> = ({ text, icon = '', className = '' }) => {
  return (
    <div className={`mml-card-header ${className}`}>
      {icon && <Icon name={icon} />}
      <span className="mml-card-header__text">{text}</span>
    </div>
  );
};
