import React, { useState, FC } from 'react';
import { Icon } from './Icon';

export type NumberProps = {
  /** The name of the number */
  name: string;
  /** The initial integer value */
  value: string | number;
};

/**
 * Mobile friendly number input
 */
export const Number: FC<NumberProps> = ({ name, value }) => {
  const [state, setState] = useState(parseInt(`${value}`, 10) || 0);

  return (
    <div className="mml-number">
      <input name={name} value={state} type="hidden" />
      <span className="mml-btn mml-btn--floating mml-btn--icon mml-number__dec" onClick={() => setState(state - 1)}>
        <Icon name="remove" />
      </span>
      <span className="mml-number__count">{state}</span>
      <span className="mml-btn mml-btn--floating mml-btn--icon mml-number__inc" onClick={() => setState(state + 1)}>
        <Icon name="add" />
      </span>
    </div>
  );
};
