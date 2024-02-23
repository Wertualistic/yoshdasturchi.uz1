import React, { createContext, useEffect, useRef, useState } from 'react';

export const DataContext = createContext();

export const DataProvider = ({ children }) => {
    const [time, setTime] = useState(60);
    const [result, setResult] = useState([]);
    const [isHandSignChecked, setIsHandSignChecked] = useState(true);
    const [handSignOpen, setHandSignOpen] = useState(true);
    const [selectedColor, setSelectedColor] = useState("grey");
    const [selectedTheme, setSelectedTheme] = useState("light");
    const [isKeyboardFalseChecked, setisKeyboardFalseChecked] = useState(true);
    const [isKeyboardTrueChecked, setisKeyboardTrueChecked] = useState(true);
    const hiddenInputRef = useRef(null);

    useEffect(() => {
        const theme = localStorage.getItem("selectedTheme");
        if (theme) {
            setSelectedTheme(theme);
        }
    }, []);

    const timer = () => {

        const timer = setInterval(() => {
            setTime((prevTime) => {
                const newTime = prevTime > 0 ? prevTime - 1 : 0;
                if (newTime === 0) {
                    clearInterval(timer);
                }
                return newTime;
            });
        }, 1000);
        return () => clearInterval(timer);

    }

    return (
        <DataContext.Provider value={{ hiddenInputRef, setisKeyboardFalseChecked, isKeyboardFalseChecked, isKeyboardTrueChecked, setisKeyboardTrueChecked, selectedTheme, setSelectedTheme, selectedColor, setSelectedColor, handSignOpen, setHandSignOpen, setIsHandSignChecked, isHandSignChecked, time, setTime, timer, result, setResult }}>
            {children}
        </DataContext.Provider>
    );
};
