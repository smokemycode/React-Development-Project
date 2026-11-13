import type { Country } from "../types";

interface CountryCardProps {
	country: Country;
}

export const CountryCard = ({ country }: CountryCardProps) => {
	// Format population with commas
	const formattedPopulation = new Intl.NumberFormat("en-US").format(
		country.population,
	);

	return (
		<div className="country-card">
			<img
				src={country.flag.url_svg}
				alt={`Flag of ${country.names.common}`}
				className="country-flag"
			/>
			<div className="country-info">
				<h2>{country.names.common}</h2>
				<p><strong>Population:</strong> {formattedPopulation}</p>
				<p><strong>Region:</strong> {country.region}</p>
				<p><strong>Capital:</strong> {country.capitals?.[0]?.name || "N/A"}</p>
			</div>
		</div>
	);
};
