import React, { createContext, useContext, useState } from 'react';

export interface pageContextType {
    currentPage: string;
    setCurrentPage: (c: string) => void
    idRef:React.MutableRefObject<string>;
}

interface pageContextProviderProps {
    children: React.ReactNode;
}


export const MyGlobalPageContext = createContext<pageContextType>({
    currentPage : "home",
    setCurrentPage:()=>{},
    idRef: {
        current: ""
    }
});

export const useGlobalContext = () => useContext(MyGlobalPageContext )



