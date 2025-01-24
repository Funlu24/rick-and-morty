// axios instance ile server'a request yapilacak servisler burada tanimlanacak
import { apiClient } from "./client";
import { Character } from "../types/Charachters";
import { Location } from "../types/Locations";

export interface APIResponse<T> {
  results: T[]; //api'den gelen verileri tutar array olarak saklar.
  info: {
    count: number; //toplam sonuc
    pages: number; //toplam sayfa
    next: string | null; //sonraki sayfa yoksa null döner
    prev: string | null; //önceki sayfa yoksa null döner
  };
}

//Kara kterleri API'den Getir
export const fetchCharacters = async (
  name: string = "", //karakter adı
  status?: "alive" | "dead" | "unknown", //karakterin durumu istege bağlı
  species?: string, //karakterin türü istege bağlı
  page: number = 1 //sayfa numarası
): Promise<APIResponse<Character>> => {
  const params: Record<string, string | number | undefined> = {
    //params sorgu parametrelerini içeren madde  //name, status, species, page
    //Bu, TypeScript'in bir nesne için tip belirleme yöntemidir.

    name,
    status,
    species,
    page,
  };

  // Boş olan parametreleri temizle
  Object.keys(params).forEach(
    (key) => params[key] === "" && delete params[key] //key bir dizi olarak döndürür.  //boş ise siler.
  );

  console.log("API Params:", params); // Filtreleme çalışıyor mu kontrol et

  const response = await apiClient.get<APIResponse<Character>>(`/character`, {
    //karakter endpointe istek gönderir.
    params,
  });
  return response.data; //response geri bildirim
};
// 🚀 Lokasyonları Getir
export const fetchLocations = async (
  //lokasyonları getirir
  name: string = "",
  type?: string, //lokasyon türü
  dimension?: string, //lokasyon boyutu
  page: number = 1
  // apı çağrısı yapar ve lokasyonları getirir
): Promise<APIResponse<Location>> => {
  //lokasyonları getirir
  const response = await apiClient.get(`/location`, {
    //lokasyon endpointe istek gönderir.
    params: { name, type, dimension, page },
  });
  return response.data as APIResponse<Location>;
};
