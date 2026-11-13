import { useState, useEffect } from "react";
import type { Country } from '../types';

// CACHE: Store the data here so its only fetched once per session
let cachedCountries: Country[] | null = null;

export const useCountries = () => {
    const [countries, setCountries] = useState<Country[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchCountries = async () => {
            // If the 3 pages of data is already stored, use them
            if (cachedCountries) {
                setCountries(cachedCountries);
                setIsLoading(false);
                return;
            }

            try {
                setIsLoading(true);
                const apiKey = import.meta.env.VITE_RESTCOUNTRIES_KEY;
                const headers = { 'Authorization': `Bearer ${apiKey}` };
                const baseUrl = 'https://api.restcountries.com/countries/v5?limit=100&page=';

                // Fetch 3 pages at the same time
                const [page1, page2, page3] = await Promise.all([
                    fetch(`${baseUrl}1`, { headers }).then(res => res.json()),
                    fetch(`${baseUrl}2`, { headers }).then(res => res.json()),
                    fetch(`${baseUrl}3`, { headers }).then(res => res.json())
                ]);

                // Check if API sent back an error
                if (page1.errors || page2.errors || page3.errors) {
                    throw new Error(page1.errors?.[0]?.message || 'API Error');
                }

                // Combine all objects from all the 3 pages into 1 array
                const combinedObjects = [
                    ...page1.data.objects,
                    ...page2.data.objects,
                    ...page3.data.objects
                ];

                // Creates a set based on the uuid which removes duplicates
                const uniqueCountries = Array.from(
                    new Map(combinedObjects.map((item) => [item.uuid, item])).values()
                );

                // Save to cache and state
                cachedCountries = uniqueCountries;
                setCountries(uniqueCountries);
            } catch (error) {
                setError(error instanceof Error ? error.message : 'An error occurred');
            } finally {
                setIsLoading(false);
            }
        };

        fetchCountries();
    }, []);

    return { countries, isLoading, error };
};