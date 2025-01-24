import { useEffect, useState } from "react";
import { fetchCharacters, fetchLocations } from "./api/service";
import { Character } from "./types/Charachters";
import { Location } from "./types/Locations";
import "./App.css";
import Card from "./components/card";

function App() {
  const [characters, setCharacters] = useState<Character[]>([]); // Api den çekilen karakter
  const [locations, setLocations] = useState<Location[]>([]); //Api den çekilen locasyon
  const [searchTerm, setSearchTerm] = useState<string>(""); //kullanıcının arama çubuguna yazdıgı
  const [selectedLocation, setSelectedLocation] = useState<string>(""); //kullanıcın şeçtiği locasyonu saklar selected //SS

  // Lokasyonları Yükle
  useEffect(() => {
    fetchLocations().then((data) => {
      // f
      console.log("Fetched Locations:", data.results); // Konsola çekilen verileri yazdır
      setLocations(data.results); // State'e lokasyon verilerini kaydet
    });
  }, []); //yalnıca 1 kez çalıstırır.

  // Karakterleri Getir ve Filtrele
  useEffect(() => {
    fetchCharacters().then((data) => {
      let filteredCharacters = data.results; // Çekilen karakterleri değişkene ata

      if (searchTerm) {
        filteredCharacters = filteredCharacters.filter(
          (char: Character) =>
            char.name.toLowerCase().includes(searchTerm.toLowerCase()) // Arama terimine göre filtrele
        );
      }

      if (selectedLocation) {
        filteredCharacters = filteredCharacters.filter(
          (char: Character) => char.location.name === selectedLocation // Seçilen lokasyona göre filtrele
        );
      }

      setCharacters(filteredCharacters); // Filtrelenmiş karakterleri state'e kaydet
    });
  }, [searchTerm, selectedLocation]);
  // searchTerm veya selectedLocation değiştiğinde tekrar çalıştır
  // Duruma Göre Renk Belirleme
  /*const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "alive":
        return "bg-green-500"; // Yeşil nokta
      case "dead":
        return "bg-red-500"; // Kırmızı nokta
      default:
        return "bg-gray-500"; // Bilinmeyenler için gri nokta
    }
  };
*/
  return (
    <div className="bg-gray-900 text-white min-h-screen p-4">
      <h1 className="text-3xl font-bold text-center mb-4">
        Rick and Morty Characters
      </h1>

      {/* Filtreleme Alanı */}
      <div className="mx-auto p-4 flex flex-col md:flex-row items-center gap-4 w-full max-w-4xl">
        {" "}
        {/* Filtreleme konteyneri, mobilde dikey, büyük ekranlarda yatay hizalı */}
        {/* Arama Kutusu */}
        <input
          type="text"
          placeholder="Search character..."
          className="p-2 border rounded w-full md:w-1/2 text-black"
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        {/* Lokasyon Seçme Kutusu */}
        <select
          className="p-2 border rounded w-full md:w-1/3 text-black"
          value={selectedLocation}
          onChange={(e) => setSelectedLocation(e.target.value)}
        >
          <option value="">All Locations</option>
          {locations.length > 0 ? ( // Eğer lokasyonlar yüklendiyse
            locations.map((loc) => (
              <option key={loc.id} value={loc.name}>
                {loc.name}
              </option> // Lokasyon seçeneklerini oluştur
            ))
          ) : (
            <option disabled>Loading locations...</option> // Lokasyonlar yüklenmiyorsa mesaj göster
          )}
        </select>
      </div>

      {/* Karakterleri Listeleme (Mobil Uyumlu Grid) */}
      <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
        {characters.length > 0 ? ( // Eğer karakterler varsa göster
          characters.map((char) => <Card key={char.id} character={char} />)
        ) : (
          <p className="text-center col-span-full text-xl text-gray-300">
            No characters found
          </p>
        )}
      </div>
    </div>
  );
}

export default App;
