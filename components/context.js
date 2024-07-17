import React, { createContext, useState } from 'react';

export const ShareDataContext = createContext();

export const DataContextProvider = ({ children }) => {
    const [data, setData] = useState(null); // Initialize with your desired state

    const updateData = (newData) => {
        setData(newData);
    };

    return (
        <ShareDataContext.Provider value={{ data, updateData }}>
            {children}
        </ShareDataContext.Provider>
    );
};