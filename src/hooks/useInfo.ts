import { useState } from 'react';

export function useInfo () {
    const [ username, setUsername ] = useState("Steve Miller");

    return {
        username
    }
}