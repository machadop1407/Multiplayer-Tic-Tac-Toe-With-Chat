import React, { FC, ReactElement, Children, cloneElement } from 'react';
import { CarouselItemProps } from './CarouselItem';

export type CarouselProps = {
  /**
   * The only children of the Carousel are the carousel item.
   */
  children?: ReactElement<CarouselItemProps>[] | ReactElement<CarouselItemProps>;
  /**
   * Base slide width set on the `Carousel` component level, it can be overriden for each CarouselItem by setting
   * a `width` attribute on the `<item>` component.
   *
   * It can be set to either a percentage, e.g. `slideWidth="40%"` or to a pixel based value `slideWidth="200px"`.
   *
   * @default '120px'
   */
  slideWidth?: string;
  /**
   * Additional carousel class name
   */
  className?: string;
};

/**
 * A carousel is a nice mobile friendly way of letting a user select something
 *
 * Super simple scroll based carousel slightly inspired by [react-scroll-snap-slider](https://github.com/lifarl/react-scroll-snap-slider)
 */
export const Carousel: FC<CarouselProps> = ({ children, slideWidth = '120px', className = '' }) => {
  return (
    <div className={`mml-carousel ${className}`}>
      <div className="mml-carousel__track">
        <div className="mml-carousel__slides">
          {Children.map(children as ReactElement, (child) =>
            cloneElement(child, { className: 'mml-carousel__slide', slideWidth }),
          )}
        </div>
      </div>
    </div>
  );
};
