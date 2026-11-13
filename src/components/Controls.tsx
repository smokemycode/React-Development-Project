import type { ChangeEvent } from "react";

interface ControlsProps {
	searchTerm: string;
	setSearchTerm: (term: string) => void;
	selectedRegion: string;
	setSelectedRegion: (region: string) => void;
}

export const Controls = ({
	searchTerm,
	setSearchTerm,
	selectedRegion,
	setSelectedRegion,
}: ControlsProps) => {
	// Runs every time the user types a letter
	const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
		setSearchTerm(e.target.value);
	};

	// Runs when the user picks a region from the dropdown
	const handleRegionChange = (e: ChangeEvent<HTMLSelectElement>) => {
		setSelectedRegion(e.target.value);
	};

	return (
		<div className="controls-container">
			{/* Search Input */}
			<input
				type="text"
				placeholder="Search for a country..."
				value={searchTerm}
				onChange={handleSearchChange}
				className="search-input"
			/>

			{/* Region Dropdown */}
			<select
				value={selectedRegion}
				onChange={handleRegionChange}
				className="region-select">
				<option value="">Filter by Region</option>
				<option value="Africa">Africa</option>
				<option value="Americas">Americas</option>
				<option value="Asia">Asia</option>
				<option value="Europe">Europe</option>
				<option value="Oceania">Oceania</option>
			</select>
		</div>
	);
};
