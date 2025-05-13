import { createContext } from 'react';

import { ActiveMediaPreset } from 'types';

export const ActiveMediaContext = createContext<{
  activeMedia: string;
  setActiveMedia: (activeMedia: ActiveMediaPreset) => void;
} | null>(null);

export const ActiveMediaContextProvider = ActiveMediaContext.Provider;
