import { useState, useEffect } from 'react';
import { useLocation } from "react-router-dom";
export default function ContructionManage() {
    const { state } = useLocation();
    const [currentWordIndex, setCurrentWordIndex] = useState(0);
    console.log("state", state);
    return (
        <div>
            <h1>Construction Management</h1>
            <p>{words[currentWordIndex]}</p>
            <button onClick={() => setCurrentWordIndex(currentWordIndex - 1)}>Previous</button>
            <button onClick={() => setCurrentWordIndex(currentWordIndex + 1)}>Next</button>
        </div>
    );
}