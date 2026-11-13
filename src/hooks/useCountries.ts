import { useState, useEffect } from "react";
import type { Country } from "../types";

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
				const headers = { Authorization: `Bearer ${apiKey}` };

				// Fetch 3 pages one after another to get all 250 countries (100 + 100 + 50)
				console.log("Fetching Page 1...");
				const res1 = await fetch(`https://api.restcountries.com/countries/v5?limit=100&offset=0`, { headers });
				const page1 = await res1.json();

				console.log("Fetching Page 2...");
				const res2 = await fetch(`https://api.restcountries.com/countries/v5?limit=100&offset=100`, { headers });
				const page2 = await res2.json();

				console.log("Fetching Page 3...");
				const res3 = await fetch(`https://api.restcountries.com/countries/v5?limit=100&offset=200`, { headers });
				const page3 = await res3.json();

				// Check if API sent back an error
				if (page1.errors || page2.errors || page3.errors) {
                    console.error("API Error:", page1.errors || page2.errors || page3.errors);
					throw new Error(page1.errors?.[0]?.message || "API Error");
				}

				// Combine all objects from all the 3 pages into 1 array
				const combinedObjects = [
					...(page1.data.objects || []),
					...(page2.data.objects || []),
					...(page3.data.objects || []),
				];

                console.log("Total fetched before deduplication:", combinedObjects.length);

				// Creates a set based on the uuid which removes duplicates
				const uniqueCountries = Array.from(
					new Map(combinedObjects.map((item) => [item.uuid, item])).values(),
				);

                console.log("Total after deduplication:", uniqueCountries.length);

				// Save to cache and state
				cachedCountries = uniqueCountries;
				setCountries(uniqueCountries);
			} catch (error) {
				setError(error instanceof Error ? error.message : "An error occurred");
			} finally {
				setIsLoading(false);
			}
		};

		fetchCountries();
	}, []);

	return { countries, isLoading, error };
};
