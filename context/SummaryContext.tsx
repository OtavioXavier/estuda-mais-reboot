'use client'

import { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { SQ } from '@/types';

interface SummaryContextType {
    data: SQ;
    subject: string;
    isEmpty: boolean;
    setSummary: (data: SQ) => void;
    setSubject: (subject: string) => void;
}

const SummaryContext = createContext<SummaryContextType | undefined>(undefined);

export const SummaryProvider = ({ children }: { children: ReactNode }) => {
    const [data, setSummary] = useState<SQ>({ resumos: [], questoes: [] });
    const [subject, setSubject] = useState<string>('');

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

    const saveSubject = (subject: string) => {
        setSubject(subject);
        if (subject) {
            localStorage.setItem('subject', JSON.stringify(subject));
        } else {
            localStorage.removeItem('subject');
        }
    };

    const isEmpty = data.resumos.length === 0 && data.questoes.length === 0;

    return (
        <SummaryContext.Provider value={{ data, setSummary: saveSummary, isEmpty, setSubject: saveSubject, subject }}>
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
