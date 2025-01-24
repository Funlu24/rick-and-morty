import { useEffect, useState } from "react";
import { fetchCharacters, fetchLocations } from "./api/service";
import { Character } from "./types/Charachters";
import { Location } from "./types/Locations";
import "./App.css";

function App() {
  const [characters, setCharacters] = useState<Character[]>([]);
  const [locations, setLocations] = useState<Location[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [selectedLocation, setSelectedLocation] = useState<string>("");

  // 📌 **Lokasyonları Yükle**
  useEffect(() => {
    fetchLocations().then((data) => {
      console.log("Fetched Locations:", data.results);
      setLocations(data.results);
    });
  }, []);

  // 📌 **Karakterleri Getir ve Filtrele**
  useEffect(() => {
    fetchCharacters().then((data) => {
      let filteredCharacters = data.results;

      if (searchTerm) {
        filteredCharacters = filteredCharacters.filter((char: Character) =>
          char.name.toLowerCase().includes(searchTerm.toLowerCase())
        );
      }

      if (selectedLocation) {
        filteredCharacters = filteredCharacters.filter(
          (char: Character) => char.location.name === selectedLocation
        );
      }

      setCharacters(filteredCharacters);
    });
  }, [searchTerm, selectedLocation]);

  // 📌 **Duruma Göre Renk Belirleme**
  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "alive":
        return "bg-green-500"; // Yeşil nokta
      case "dead":
        return "bg-red-500"; // Kırmızı nokta
      default:
        return "bg-gray-500"; // Bilinmeyenler için gri nokta
    }
  };

  return (
    <div className="bg-gray-900 text-white min-h-screen p-4">
      <h1 className="text-3xl font-bold text-center mb-4">
        Rick and Morty Characters
      </h1>

      {/* 📌 **Filtreleme Alanı** */}
      <div className="mx-auto p-4 flex flex-col md:flex-row items-center gap-4 w-full max-w-4xl">
        {/* **Arama Kutusu** */}
        <input
          type="text"
          placeholder="Search character..."
          className="p-2 border rounded w-full md:w-1/2 text-black"
          onChange={(e) => setSearchTerm(e.target.value)}
        />

        {/* **Lokasyon Seçme Kutusu** */}
        <select
          className="p-2 border rounded w-full md:w-1/3 text-black"
          value={selectedLocation}
          onChange={(e) => setSelectedLocation(e.target.value)}
        >
          <option value="">All Locations</option>
          {locations.length > 0 ? (
            locations.map((loc) => (
              <option key={loc.id} value={loc.name}>
                {loc.name}
              </option>
            ))
          ) : (
            <option disabled>Loading locations...</option>
          )}
        </select>
      </div>

      {/* 📌 **Karakterleri Listeleme (Mobil Uyumlu Grid)** */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-4">
        {characters.length > 0 ? (
          characters.map((char) => (
            <div
              key={char.id}
              className="border p-4 rounded shadow-lg bg-gray-800"
            >
              <img
                src={char.image}
                alt={char.name}
                className="rounded w-full"
              />
              <h2 className="text-xl font-bold mt-2 flex items-center gap-2">
                {char.name}
                <span
                  className={`w-3 h-3 rounded-full ${getStatusColor(
                    char.status
                  )}`}
                ></span>
              </h2>
              <p>Status: {char.status}</p>
              <p>Species: {char.species}</p>
              <p>Gender: {char.gender}</p>
              <p>Origin: {char.origin.name}</p>
              <p>Location: {char.location.name}</p>
            </div>
          ))
        ) : (
          <p className="text-center col-span-full text-xl">
            No characters found
          </p>
        )}
      </div>
    </div>
  );
}

export default App;
