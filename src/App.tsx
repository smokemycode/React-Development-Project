import { useState } from "react";
import { Route, Routes } from "react-router-dom";
import { useTheme } from "./hooks/useTheme";
import { useCountries } from "./hooks/useCountries";
import { CountryCard } from "./components/CountryCard";
import { Controls } from "./components/Controls";
import { CountryDetail } from "./components/CountryDetail";

function App() {
	const { theme, toggleTheme } = useTheme();
	const { countries, isLoading, error } = useCountries();

	// State for search term and selected region
	const [searchTerm, setSearchTerm] = useState("");
	const [selectedRegion, setSelectedRegion] = useState("");
	console.log("Countries in App:", countries.length);

	// Filter countries based on search term and selected region
	const filteredCountries = countries.filter((country) => {
		// Filter by search term
		const matchesSearch =
			country.names.common?.toLowerCase().includes(searchTerm.toLowerCase()) ??
			false;

		// Filter by selected region
		const matchesRegion =
			selectedRegion === "" || country.region === selectedRegion;

		// Only keep the country if it passed both filters
		return matchesSearch && matchesRegion;
	});

	return (
		<div>
			<header className="header">
				<h1>Where in the world?</h1>
				<button onClick={toggleTheme} className="theme-toggle">
					{theme === "light" ? "Dark Mode" : "Light Mode"}
				</button>
			</header>

			<main>
				<Routes>
					{/* Route 1: The Home Page (List of countries) */}
					<Route
						path="/"
						element={
							<>
								{/* Render the Controls component */}
								<Controls
									searchTerm={searchTerm}
									setSearchTerm={setSearchTerm}
									selectedRegion={selectedRegion}
									setSelectedRegion={setSelectedRegion}
								/>
								{/* Map over filteredCountries instead of the original array */}
								{isLoading && <p>Loading countries...</p>}
								{error && <p style={{ color: "red" }}>Error: {error}</p>}
								{!isLoading && !error && (
									<div className="countries-grid">
										{filteredCountries.map((country) => (
											<CountryCard key={country.uuid} country={country} />
										))}
									</div>
								)}
								{/* Show a message if no countries match the search */}
								{!isLoading && !error && filteredCountries.length === 0 && (
									<p className="no-results">
										No countries found matching your search.
									</p>
								)}
							</>
						}
					/>

					{/* Route 2: The Detail Page (e.g., /country/CAN) */}
					<Route path="/country/:code" element={<CountryDetail />} />
				</Routes>
			</main>
		</div>
	);
}

export default App;
