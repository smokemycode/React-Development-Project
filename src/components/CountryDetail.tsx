import { useParams, Link } from 'react-router-dom';
import { useCountries } from '../hooks/useCountries.ts';

export const CountryDetail = () => {
    // Get the country code from the URL
    const { code } = useParams<{ code: string }>();

    // Get the countries from the context
    const { countries, isLoading } = useCountries();

    // Find the country with the matching code
    const country = countries.find((c) => c.codes.alpha_3 === code);

    if (isLoading) return <p>Loading...</p>;
    if (!country) return <p>Country not found.</p>;

    // Format languages, currencies, and borders for display
    const languages = country.languages?.map((l) => l.name).join(', ') || 'N/A';
    const currencies = country.currencies?.map((c) => c.name).join(', ') || 'N/A';
    const borders = country.borders || [];

    // Format population
    const formattedPopulation = new Intl.NumberFormat('en-US').format(country.population);

    return (
        <div className="detail-container">
            {/* Back Button */}
            <Link to="/" className="back-button">
                ← Back
            </Link>

            <div className="detail-content">
                <img
                    src={country.flag?.url_svg || "https://via.placeholder.com/300x150"}
                    alt={`Flag of ${country.names.common}`}
                    className="detail-flag"
                />

                <div className="detail-info">
                    <h1>{country.names.common}</h1>
                    <div className="detail-columns">
                        <div>
                            <p><strong>Native Name:</strong> {country.names.native?.eng?.common || 'N/A'}</p>
                            <p><strong>Population:</strong> {formattedPopulation}</p>
                            <p><strong>Region:</strong> {country.region}</p>
                            <p><strong>Sub Region:</strong> {country.subregion || 'N/A'}</p>
                            <p><strong>Capital:</strong> {country.capitals?.[0]?.name || 'N/A'}</p>
                        </div>
                        <div>
                            <p><strong>Top Level Domain:</strong> {country.tlds?.[0] || 'N/A'}</p>
                            <p><strong>Currencies:</strong> {currencies}</p>
                            <p><strong>Languages:</strong> {languages}</p>
                        </div>
                    </div>

                    {/* Border Countries */}
                    {borders.length > 0 && (
                        <div className="border-countries">
                            <strong>Border Countries: </strong>
                            {borders.map((borderCode) => (
                                <Link
                                    key={borderCode}
                                    to={`/country/${borderCode}`}
                                    className="border-btn"
                                >
                                    {borderCode}
                                </Link>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};