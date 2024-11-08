'use client'

import { useEffect, useState } from 'react';
import { invoke } from '@tauri-apps/api/core';



export default function Greet() {
    const [greeting, setGreeting] = useState('');

    useEffect(() => {
        // invoke  one command here
        invoke<string>('greet_together', { name: 'Next.js & Tauri APP calling with greet_together' })
            .then(result => setGreeting(result))
            .catch(console.error)
    }, [])

    // Necessary because we will have to use Greet as a component later.
    return <div>{greeting}</div>;
}