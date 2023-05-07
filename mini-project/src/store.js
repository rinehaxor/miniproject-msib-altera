import { atom } from 'jotai';

export const movieListAtom = atom([]);
export const currentPageAtom = atom(1);
export const totalPagesAtom = atom(1);
export const searchQueryAtom = atom('');
export const searchYearAtom = atom('');
export const detailsAtom = atom([]);
export const plotTypeAtom = atom('short');
export const modalVisibleAtom = atom(false);
export const selectedMovieIndexAtom = atom(null);
export const hasSearchedAtom = atom(false);
