// karakter tipleri burda tanımlanacak
// ve export edilecek

export interface Character {
  id: number;
  name: string;
  status: "alive" | "dead" | "unknown"; // Özel type güvenliği
  species: string;
  type: string;
  gender: string;
  origin: { name: string; url: string };
  location: { name: string; url: string };
  image: string;
  episode: string[];
  url: string;
  created: string;
}
