import { useEffect, useState } from "react";
import { fetchCharacters } from "./api/service"; //rick and morty api getirmek için
import { Character } from "./types/Charachters"; //karakter tipi
import "./App.css"; //Sayfa stilleri için

function App() {
  const [characters, setCharacters] = useState<Character[]>([]); //karakterlerin durumu set günceller ve başlangıçta boş bir dizi
  useEffect(() => {
    fetchCharacters().then((data) => setCharacters(data.results)); //karakterleri getirir ve set eder ve data.results ile karakterleri alır //fetchCharacters() fonksiyonu çağrılıyor ve dönen verinin results kısmı characters state'ine atanıyor.
  }, []);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold text-center mb-4">
        Rick and Morty Characters
      </h1>
      //tailwindcss ile stillendirilmiş filtrelemeyi buraya ekleyin mx_auto
      ortalama p-4 ise bolsuk bırakır kenralara
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-4">
        {characters.map(
          (
            char //karakterleri map ile döngüye alır ve her bir karakter için bir div oluşturur
          ) => (
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
          )
        )}
      </div>
    </div>
  );
}

export default App;
