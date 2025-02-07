'use client'

import { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { SQ } from '@/types';

interface SummaryContextType {
    data: SQ;
    isEmpty: boolean;
    setData: (data: SQ) => void;
}

const SummaryContext = createContext<SummaryContextType | undefined>(undefined);

export const SummaryProvider = ({ children }: { children: ReactNode }) => {
    const [data, setData] = useState<SQ>({ resumos: [], questoes: [] });

    useEffect(() => {
        const savedSummary = localStorage.getItem('sq');
        if (savedSummary) {
            setData(JSON.parse(savedSummary));
        }
    }, []);

    const saveData = (data: SQ) => {
        setData(data);
        if (data) {
            localStorage.setItem('sq', JSON.stringify(data));
        } else {
            localStorage.removeItem('sq');
        }
    };

    const isEmpty = data.resumos.length === 0 && data.questoes.length === 0;

    return (
        <SummaryContext.Provider value={{ data, setData: saveData, isEmpty}}>
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
