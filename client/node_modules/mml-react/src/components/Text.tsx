import React, { FC } from 'react';

export type TextProps = {
  /** Text to render */
  text: string;
  /** Additional class name */
  className?: string;
};

/**
 * Simple paragraph text element
 */
export const Text: FC<TextProps> = ({ text, className = '' }) => {
  return <div className={`mml-text ${className}`.trim()}>{text}</div>;
};
