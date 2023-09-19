import React, { useState, useEffect, Fragment } from "react";
import Select from "react-select";

function API() {
  const [countries, setCountries] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredCountries, setFilteredCountries] = useState([]);
  const [selectedRegion, setSelectedRegion] = useState("");

  const options = [
    { value: "Africa", label: "Africa" },
    { value: "Antarctic", label: "Antarctic" },
    { value: "Asia", label: "Asia" },
    { value: "Europe", label: "Europe" },
    { value: "Americas", label: "Americas" },
    { value: "Oceania", label: "Oceania" },
  ];

  useEffect(() => {
    fetch("https://restcountries.com/v3.1/all")
      .then((response) => response.json())
      .then((data) => {
        setCountries(data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  useEffect(() => {
    const filteredByRegion = selectedRegion
      ? countries.filter(
          country => country.region.toLowerCase() === selectedRegion.toLowerCase()
        )
      : countries;

    const filteredBySearch = filteredByRegion.filter(country =>
      country.name.common.toLowerCase().includes(searchTerm.toLowerCase())
    );

    setFilteredCountries(filteredBySearch);//.slice(0, 8) untuk hanya menampilkan data dari 1 sampai 8
  }, [selectedRegion, searchTerm, countries]);

  return (
    <Fragment>
  <div className="p-4 h-screen overflow-hidden">
    <h1 className="text-2xl font-bold mb-4 text-sky-400">Country List</h1>
    <div className="flex justify-between p-4">
      <input
        type="text"
        className="p-2 pl-4 border rounded mb-4 w-2/5 focus:outline-none focus:border-blue-400"
        placeholder="Search by Country"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      <Select
        options={options}
        className="p-2 rounded"
        placeholder="Search by Region"
        value={selectedRegion}
        onChange={(e) => setSelectedRegion(e.value)}
      />
    </div>

    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {filteredCountries.length === 0 ? (
        <p className="text-center col-span-4 text-gray-600">
          Found no Data
        </p>
      ) : (
        filteredCountries.map((country, index) => (
          <div
            key={index}
            className="border p-2 pb-1 flex flex-col bg-white rounded shadow-md"
          >
            <div>
              <img
                src={country.flags.png}
                alt={`Flag of ${country.name.common}`}
                className="w-full h-32 object-cover"
              />
            </div>
            <div className="text-left text-sm pt-2">
              <p className="font-semibold pb-2">
                <strong>{country.name.common}</strong>
              </p>
              <p>
                <strong>Region: </strong>
                {country.region}
              </p>
              <p>
                <strong>Population: </strong>
                {country.population}
              </p>
              <p>
                <strong>Capital: </strong>
                {country.capital}
              </p>
            </div>
          </div>
        ))
      )}
    </div>
  </div>
</Fragment>

  );
}

export default API;

