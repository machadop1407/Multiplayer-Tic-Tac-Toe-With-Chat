import React, { FC, ReactNode } from 'react';

export type ColProps = {
  /** The column children can be anything */
  children?: ReactNode;
  /** The width of the column (grid is by default made of 12 columns, you can change it with scss variable `$mml-grid-columns`) */
  width?: number | 'auto';
  /** The offset for the column */
  offset?: number;
  /** Align horizontally */
  align?: 'left' | 'center' | 'right';
};

/**
 * A grid column
 * TODO: Consider renaming this element
 */
export const Col: FC<ColProps> = ({ children, width = 12, offset = 0, align = 'left' }) => {
  let classNames = `mml-col-${width}`;
  if (offset) classNames = classNames + ` mml-offset-${offset}`;
  classNames = classNames + ` mml-align-${align}`;

  return <div className={classNames}>{children}</div>;
};
