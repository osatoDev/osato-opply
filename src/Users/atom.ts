

import { atom } from 'recoil';

export const userState = atom({
  key: 'userState', // unique ID (with respect to other atoms/selectors)
  default: {} as any, // default value (aka initial value)
});

type FilterParam = {
    filter: { and: [] }
  };

export const userFilter = atom({
  key: 'userFilter',
  default: {
    filter: {
      and: []
    }
  } as FilterParam
});

