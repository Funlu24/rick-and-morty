// locations interface here

export interface Location {
  id: number;
  name: string;
  type: string;
  dimension: string;
  residents: string[]; // Karakter URL'leri
  url: string;
  created: string;
}
