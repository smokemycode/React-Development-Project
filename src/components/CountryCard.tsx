import type { Country } from "../types";

interface CountryCardProps {
	country: Country;
}

export const CountryCard = ({ country }: CountryCardProps) => {
	// Format population with commas
	const formattedPopulation = new Intl.NumberFormat("en-US").format(
		country.population,
	);

	// Get the flag image URL
	const flagUrl =
		country.flag?.url_svg || "https://via.placeholder.com/300x150?text=No+Flag";

	return (
		<div className="country-card">
			<img
				src={flagUrl}
				alt={`Flag of ${country.names?.common || "Unknown"}`}
				className="country-flag"
			/>
			<div className="country-info">
				<h2>{country.names?.common || "Unknown Country"}</h2>
				<p><strong>Population:</strong> {formattedPopulation || "N/A"}</p>
				<p><strong>Region:</strong> {country.region || "N/A"}</p>
				<p><strong>Capital:</strong> {country.capitals?.[0]?.name || "N/A"}</p>
			</div>
		</div>
	);
};
