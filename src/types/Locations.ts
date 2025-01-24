// locations interface here

import { apiClient } from "../api/client";
import { APIResponse } from "../api/service";

export interface Location {
  id: number;
  name: string;
  type: string;
  dimension: string;
  residents: string[]; // Karakter URL'leri
  url: string;
  created: string;
}
// 🚀 **Lokasyonları Getir**
export const fetchLocations = async (): Promise<APIResponse<Location>> => {
  const response = await apiClient.get<APIResponse<Location>>("/location");
  return response.data;
};
