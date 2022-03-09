import React, { FC, ReactNode } from 'react';
import { CarouselProps } from './Carousel';

export type CarouselItemProps = {
  /**
   * The carousel item inner components can contain any type of nodes, such as buttons, images, etc.
   */
  children?: ReactNode;
  /**
   * Determines the slide width, it can be set to either a percentage, e.g. `width="40%"` or to a pixel based value `width="200px"`.
   * It defaults to the `slideWidth` prop set at the `<carousel>` level
   *
   * @default ''
   */
  width?: string;
  /**
   * Additional carousel item class name
   */
  className?: string;
} & Pick<CarouselProps, 'slideWidth'>;

/**
 * A carousel item
 */
export const CarouselItem: FC<CarouselItemProps> = ({ children, slideWidth, width = '', className = '' }) => {
  const finalWidth = width || slideWidth;
  return (
    <div className={`mml-carousel-item ${className}`} style={{ flex: `0 0 ${finalWidth}`, minWidth: finalWidth }}>
      {children}
    </div>
  );
};
