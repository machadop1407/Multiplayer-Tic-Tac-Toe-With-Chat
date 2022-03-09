import React, { FC } from 'react';

export type IconProps = {
  /** The name of the material icon, see https://material.io/resources/icons/ */
  name: string;
};

export const Icon: FC<IconProps> = ({ name }) => {
  return <i className="mml-icon material-icons">{name}</i>;
};
