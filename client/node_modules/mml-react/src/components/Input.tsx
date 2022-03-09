import React, { FC, useState } from 'react';

export type InputProps = {
  /** The name of the input */
  name: string;
  /** The label of the input (it is presented as a `CardHeader` */
  label?: string;
  /** Initial value of the input */
  value?: string;
  /** The input type */
  type?: string;
  /** The placeholder of the input field */
  placeholder?: string;
};

/**
 * Text input element. Usually you'll want to rely on regular messages
 */
export const Input: FC<InputProps> = ({ name, label, value = '', type = 'text', placeholder = '' }) => {
  const [state, setState] = useState(value);
  const id = `mml-${name}`;

  return (
    <>
      {label && (
        <label className="mml-card-header" htmlFor={id}>
          <span className="mml-card-header__text">{label}</span>
        </label>
      )}
      <input
        id={id}
        className="mml-input"
        name={name}
        value={state}
        type={type}
        placeholder={placeholder}
        onChange={(event) => setState(event.target.value)}
      />
    </>
  );
};
