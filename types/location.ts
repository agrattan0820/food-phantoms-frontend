export interface Location {
  id: number;
  created_at: string;
  updated_at: string;
  kitchen_id: number;
  address_1: string;
  address_2: string | null;
  city: string;
  state: string;
  country: string;
  zip_code: string;
  google_rating: number;
}
