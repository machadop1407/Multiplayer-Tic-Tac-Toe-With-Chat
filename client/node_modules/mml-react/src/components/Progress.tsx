import React, { FC } from 'react';

export type ProgressProps = {
  /**
   * The size of the progress spinner sets the diameter of the animated circle, it allows to override a specific progress size despite the default CSS value
   * @default 'SCSS: $mml-progress-width: 1em'
   */
  size?: string | number;
  /**
   * The thickness of the circle, (it sets the `stroke-wdith` svg attribute)
   * @default 3.6
   */
  thickness?: string | number;
  /**
   * The color of the progress circle, it allows to override a specific progress color despite the default CSS value
   * @default 'SCSS: $mml-progress-color: #bbb'
   */
  color?: string;
};

const SIZE = 44;

export const Progress: FC<ProgressProps> = ({ size, thickness = 3.6, color }) => {
  thickness = typeof thickness === 'string' ? parseFloat(thickness) : thickness;
  // interpret a digit only string or a number as a pixel value otherwise leave
  // it as astring, it might be a value like `2em` or `120%`
  size = (typeof size === 'string' && /^\d+$/.test(size)) || typeof size === 'number' ? size + 'px' : size;

  return (
    <span className="mml-progress" role="progressbar" style={{ width: size, height: size, color }}>
      <svg className="mml-progress__svg" viewBox={`${SIZE / 2} ${SIZE / 2} ${SIZE} ${SIZE}`}>
        <circle
          className="mml-progress__circle"
          cx={SIZE}
          cy={SIZE}
          r={(SIZE - thickness) / 2}
          fill="none"
          strokeWidth={thickness}
        />
      </svg>
    </span>
  );
};
