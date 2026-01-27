import {useState, useEffect} from 'react';

function useLocalStorage(key, initialValue) {
    const [value, setValue] = useState(() => {
        try 
        {
            const storedValue = localStorage .getItem(key);
            return storedValue ? JSON.parse(storedValue) : initialValue;
        } 
        catch (error) 
        {
            console.error('Error reading localStorage key “' + key + '”: ', error);
            return initialValue;
        }
    });
    
    useEffect(() => {
        try 
        {
            localStorage.setItem(key, JSON.stringify(value));

            console.log('Saved to localStorage key “' + key + '”: ', value);
        }
        catch (error)
        {
            console.error('Error setting localStorage key “' + key + '”: ', error); 
        }

    }, [key, value]);

    return [value, setValue];
}

export default useLocalStorage;