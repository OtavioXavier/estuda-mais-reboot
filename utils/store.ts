import { SQ } from '@/types';
import { create } from 'zustand';

interface ISummaryQuestions {
  data: SQ,
  setData: (data: SQ) => void
}

export const useSummaryStore = create<ISummaryQuestions>((set) => ({
  data: {
    resumos: [],
    questoes: []
  },
  setData: (newData: SQ) => { set({ data: newData }) },
}))
