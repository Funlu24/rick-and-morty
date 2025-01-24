import React from "react";
import { Character } from "../types/Charachters";

//Duruma Göre Renk Belirleme Fonksiyonu
const getStatusColor = (status: string) => {
  switch (status.toLowerCase()) {
    case "alive":
      return "bg-green-500"; // Yaşayanlar için yeşil
    case "dead":
      return "bg-red-500"; // Ölüler için kırmızı
    default:
      return "bg-gray-500"; // Bilinmeyenler için gri
  }
};

// Card Bileşeni
const Card: React.FC<{ character: Character }> = ({ character }) => {
  return (
    <div
      className="bg-gradient-to-br from-purple-500 via-blue-400 to-pink-500
                 border border-gray-700 rounded-xl shadow-md p-4 transition-transform duration-300 
                 ease-in-out transform hover:scale-105 hover:shadow-2xl"
    >
      {/* Karakter Görseli */}
      <img
        src={character.image}
        alt={character.name}
        className="rounded-t-lg w-full h-60 object-cover"
      />

      <div className="p-4 text-center">
        {/* Karakter Adı + Durum Göstergesi */}
        <h2 className="text-xl font-semibold flex items-center justify-center gap-2 text-white">
          {character.name}
          <span
            className={`w-3 h-3 rounded-full ${getStatusColor(
              character.status
            )}`}
          ></span>
        </h2>

        {/* Karakter Bilgileri */}
        <p className="text-gray-300 text-sm mt-1">
          Status: <span className="text-white">{character.status}</span>
        </p>
        <p className="text-gray-300 text-sm">
          Species: <span className="text-white">{character.species}</span>
        </p>
        <p className="text-gray-300 text-sm">
          Gender: <span className="text-white">{character.gender}</span>
        </p>
        <p className="text-gray-300 text-sm">
          Origin: <span className="text-white">{character.origin.name}</span>
        </p>
        <p className="text-gray-300 text-sm">
          Location:{" "}
          <span className="text-white">{character.location.name}</span>
        </p>
      </div>
    </div>
  );
};

export default Card;
