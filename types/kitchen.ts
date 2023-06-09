export interface Kitchen {
  id: number;
  created_at: string;
  updated_at: string;
  name: string;
  logo: string | null;
  description: string | null;
  website_link: string | null;
  doordash_link: string | null;
  parent_id: number | null;
  type: "virtual" | "ghost";
  slug: string;
  parent_name: string | null;
  parent_link: string | null;
}
