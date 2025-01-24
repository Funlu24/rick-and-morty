// karakter tipleri burda tanımlanacak
// ve export edilecek

import { apiClient } from "../api/client";
import { APIResponse } from "../api/service";

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
export const fetchCharacters = async (): Promise<APIResponse<Character>> => {
  const response = await apiClient.get<APIResponse<Character>>("/character");
  return response.data;
};
