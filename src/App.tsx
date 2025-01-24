import { useEffect, useState } from "react";
import { fetchCharacters } from "./api/service"; //rick and morty api getirmek için
import { Character } from "./types/Charachters"; //karakter tipi
import "./App.css"; //Sayfa stilleri için

function App() {
  const [characters, setCharacters] = useState<Character[]>([]); //karakterlerin durumu set günceller ve başlangıçta boş bir dizi
  useEffect(() => {
    fetchCharacters().then((data) => setCharacters(data.results)); //karakterleri getirir ve set eder ve data.results ile karakterleri alır //fetchCharacters() fonksiyonu çağrılıyor ve dönen verinin results kısmı characters state'ine atanıyor.
  }, []);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [locations] = useState<{ id: number; name: string }[]>([]);
  const [selectedLocation, setSelectedLocation] = useState<string>("");

  useEffect(() => {
    fetchCharacters().then((data) => {
      const filteredCharacters = data.results.filter((char: Character) =>
        char.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setCharacters(filteredCharacters);
    });
  }, [searchTerm]);

  //tailwindcss ile stillendirilmiş filtrelemeyi buraya ekleyin mx_auto ortalama p-4 ise bolsuk bırakır kenralara

  return (
    <div className="bg-gray-900 text-white min-h-screen p-4">
      <h1 className="text-3xl font-bold text-center">
        Rick and Morty Characters
      </h1>

      {/* 📌 **Filtreleme Alanı** */}
      <div className="mx-auto p-4 flex flex-col md:flex-row items-center gap-4">
        {/* **Arama Kutusu** */}
        <input
          type="text"
          placeholder="Search character..."
          className="p-2 border rounded w-1/2 text-black"
          onChange={(e) => setSearchTerm(e.target.value)}
        />

        {/* **Lokasyon Seçme Kutusu** */}
        <select
          className="p-2 border rounded w-1/3 text-black"
          value={selectedLocation}
          onChange={(e) => setSelectedLocation(e.target.value)}
        >
          <option value="">All Locations</option>
          {locations.map((loc) => (
            <option key={loc.id} value={loc.name}>
              {loc.name}
            </option>
          ))}
        </select>
      </div>

      {/* 📌 **Karakterleri Listeleme** */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {characters.length > 0 ? (
          characters.map((char) => (
            <div key={char.id} className="border p-4 rounded shadow-lg">
              <img
                src={char.image}
                alt={char.name}
                className="rounded w-full"
              />
              <h2 className="text-xl font-bold mt-2">{char.name}</h2>
              <p>Status: {char.status}</p>
              <p>Species: {char.species}</p>
              <p>Gender: {char.gender}</p>
              <p>Origin: {char.origin.name}</p>
              <p>Location: {char.location.name}</p>
            </div>
            //ekrana karakterin adı, resmi, durumu, türü, cinsiyeti, doğum yeri ve yaşadığı yer bilgilerini yazdırır
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
