import { useTheme } from "./hooks/useTheme";
import { useCountries } from "./hooks/useCountries";
import { CountryCard } from "./components/CountryCard";

function App() {
	const { theme, toggleTheme } = useTheme();
	const { countries, isLoading, error } = useCountries();

	return (
		<div>
			<header className="header">
				<h1>Where in the world?</h1>
				<button onClick={toggleTheme} className="theme-toggle">
					{theme === "light" ? "Dark Mode" : "Light Mode"}
				</button>
			</header>

			<main>
				{/* Loading state */}
				{isLoading && <p>Loading countries...</p>}

				{/* Error state */}
				{error && <p style={{ color: "red" }}>Error: {error}</p>}

				{/* Render the list */}
				{!isLoading && !error && (
					<div className="countries-grid">
						{countries.map((country) => (
							<CountryCard key={country.uuid} country={country} />
						))}
					</div>
				)}
			</main>
		</div>
	);
}

export default App;
