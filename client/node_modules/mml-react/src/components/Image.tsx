import React, { FC } from 'react';

export type ImageProps = {
  /** The url to load the image from */
  src: string;
  /** The alt tag for the image */
  alt?: string;
  /** The title tag for the image */
  title?: string;
  /** Additional class name */
  className?: string;
};

export const Image: FC<ImageProps> = ({ src, alt = '', title = '', className = '' }) => {
  return <img className={`mml-image ${className}`.trim()} src={src} alt={alt} title={title} />;
};
