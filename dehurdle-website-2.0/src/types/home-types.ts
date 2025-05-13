import React from 'react';

import { IHomeCardPreset } from 'constant';

export interface INavItems {
  label: string;
  route: string;
}

interface IPrimaryCard {
  color: string;
  description: string;
  image: string;
  number: number;
  numberColor: string;
  preset: IHomeCardPreset.Primary;
  title: string;
  className?: string;
}

interface ISecondaryCard {
  color: string;
  image: string;
  number: number;
  numberColor: string;
  preset: IHomeCardPreset.Secondary;
  className?: string;
}

type ICard = IPrimaryCard | ISecondaryCard;

export type { ICard, IPrimaryCard, ISecondaryCard };

export interface IExploreDehurdle {
  icon: React.ElementType;
  key: string;
}

export enum ExploreCardType {
  Science = 'science',
  Enterprise = 'enterprise',
}
