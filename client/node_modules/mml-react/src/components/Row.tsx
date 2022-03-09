import React, { FC, ReactElement } from 'react';

import { ColProps } from './Col';

export type RowProps = {
  /** The children of a row must be columns */
  children?: ReactElement<ColProps>[] | ReactElement<ColProps>;
};

export const Row: FC<RowProps> = ({ children }) => {
  return <div className="mml-row">{children}</div>;
};
