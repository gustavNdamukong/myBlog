import { useState, useEffect } from 'react';

const useFetch = (url) => {
    const [data, setData] = useState(null);
    const [isPending, setIsPending] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        // create an abortController object
        const abortCont = new AbortController();

        setTimeout(() => {
            fetch(url, { signal: abortCont.signal })
            .then(res => {
                if (!res.ok) { 
                    // error coming back from server
                    throw Error('could not fetch the data for that resource');
                } 
                return res.json();
            })
            .then(data => {
                setIsPending(false);
                setData(data);
                setError(null);
            })
            .catch(err => {
                // auto catches network / connection error
                // but it may be an abort error in which case we do not want to do anything
                if (err.name === 'AbortError') {
                    console.log('abort error');
                }
                else
                {
                    setIsPending(false);
                setError(err.message);
                }
            })
        }, 1000);

        // do the cleanup here as last thing inside this first arg func of useEffect() 
        return () => abortCont.abort();
    }, [url])

    return { data, isPending, error };
}
    
    export default useFetch;