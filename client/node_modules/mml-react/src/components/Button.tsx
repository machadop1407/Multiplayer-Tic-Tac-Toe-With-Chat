import React, { FC, SyntheticEvent } from 'react';
import { sanitizeUrl } from '@braintree/sanitize-url';

import { Icon } from './Icon';

export type ButtonProps = {
  /** Additional button class name */
  className?: string;
  /** The text to display in the button */
  text: string;
  /** The name of the button */
  name?: string;
  /** The value of the button */
  value?: string;
  /** If the button should open a link use this prop */
  url?: string;
  /** Button style variant */
  variant?: 'floating';
  /** Optional button icon name to display besides the text (from [material icons](https://material.io/resources/icons/)) */
  icon?: string;
};

/**
 * Button can be used to open a URL, submit the form or trigger a select when clicked
 */
export const Button: FC<ButtonProps> = ({ className = '', text, name, value, url = '', variant, icon }) => {
  if (icon) {
    className += text ? ' mml-btn--with-icon' : ' mml-btn--icon';
  } else {
    className += ' mml-btn--text';
  }
  className += variant === 'floating' ? ' mml-btn--floating' : ' mml-btn--grounded';

  if (url)
    return (
      <a className={`mml-btn ${className}`} href={sanitizeUrl(url)} target="_blank" rel="nofollow noreferrer noopener">
        {icon && <Icon name={icon} />}
        {text}
      </a>
    );

  return (
    <button
      className={`mml-btn ${className}`}
      type="submit"
      name={name}
      value={value}
      onClick={(event: SyntheticEvent) => {
        const input = document.createElement('input');
        input.type = 'hidden';
        input.name = name || '';
        input.value = value || '';
        event.currentTarget?.closest('form')?.appendChild(input);
      }}
    >
      {icon && <Icon name={icon} />}
      {text}
    </button>
  );
};
