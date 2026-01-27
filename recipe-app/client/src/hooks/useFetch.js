import { useState, useEffect, useCallback } from "react";
import axios from "axios";



function useFetch(url, options = {}) {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const fetchData = useCallback(async () => {

        if (!url) {
            setLoading(false);
            setError('No URL provided');
            return;
        }
        try {
            setLoading(true);
            setError(null);
            console.log('Fetching data from URL: ', url);
            const response = await axios.get(url, options);
            setData(response.data);
            console.log('Data fetched successfully: ', response.data);
        } catch (error) {
            setError(error.message || 'Error fetching data');
            console.error('Error fetching data from URL “' + url + '”: ', error);
        } finally {
            setLoading(false);
        }
    }, [url, JSON.stringify(options)]);

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    return { data, loading, error, refetch: fetchData };
}
export default useFetch;
