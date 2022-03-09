import React, { FC, ReactElement } from 'react';
import { ButtonProps } from './Button';

export type ButtonListProps = {
  /** A list of buttons */
  children?: ReactElement<ButtonProps>[] | ReactElement<ButtonProps>;
  /** Button style variant */
  variant?: 'floating';
};

/**
 * A list of buttons
 */
export const ButtonList: FC<ButtonListProps> = ({ children, variant = '' }) => {
  return (
    <div className={`mml-btnlist ${variant === 'floating' ? ' mml-btnlist--floating' : 'mml-btnlist--grounded'}`}>
      {children}
    </div>
  );
};
