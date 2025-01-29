'use client'

import { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { SQ } from '@/types';

interface SummaryContextType {
    data: SQ;
    setSummary: (data: SQ) => void;
    isEmpty: boolean;
}

const SummaryContext = createContext<SummaryContextType | undefined>(undefined);

export const SummaryProvider = ({ children }: { children: ReactNode }) => {
    const [data, setSummary] = useState<SQ>({ resumos: [], questoes: [] });

    useEffect(() => {
        const savedSummary = localStorage.getItem('summary');
        if (savedSummary) {
            setSummary(JSON.parse(savedSummary));
        }
    }, []);

    const saveSummary = (data: SQ) => {
        setSummary(data);
        if (data) {
            localStorage.setItem('summary', JSON.stringify(data));
        } else {
            localStorage.removeItem('summary');
        }
    };

    const isEmpty = data.resumos.length === 0 && data.questoes.length === 0;

    return (
        <SummaryContext.Provider value={{ data, setSummary: saveSummary, isEmpty }}>
            {children}
        </SummaryContext.Provider>
    );
};

export const useSummary = () => {
    const context = useContext(SummaryContext);
    if (!context) {
        throw new Error('useSummary deve ser usado com SummaryProvider');
    }
    return context;
};
