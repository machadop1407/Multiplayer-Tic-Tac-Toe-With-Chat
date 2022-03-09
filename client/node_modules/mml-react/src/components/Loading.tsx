import React, { FC } from 'react';
import { Progress, ProgressProps } from './Progress';

export type LoadingProps = {
  /**
   * Flag that indicates whether the component should show
   * @default false
   */
  loading?: boolean;
  /**
   * Optional text to display besides the progress indicator
   */
  text?: string;
  /**
   * Additional element class name
   * @default ''
   */
  className?: string;
} & ProgressProps;

/**
 * Loading indicator
 */
export const Loading: FC<LoadingProps> = ({ className = '', loading = false, text, size, thickness, color }) => {
  if (!loading) return null;

  return (
    <div className={`mml-loading ${className}`}>
      <Progress {...{ size, thickness, color }} />
      {text && <div className="mml-loading__text">{text}</div>}
    </div>
  );
};
