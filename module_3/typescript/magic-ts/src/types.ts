// define the colors of Magic cards
export type MagicColor = "White" | "Blue" | "Black" | "Red" | "Green";

// define the rarities of Magic cards
export type Rarity = "Common" | "Uncommon" | "Rare" | "Mythic Rare";

// define the structure of a Magic card
export interface MagicCard {
  id: string;
  name: string;
  manaCost?: string;
  cmc?: number;
  colors?: MagicColor[];
  type: string;
  rarity: Rarity;
  set: string;
  text?: string;
  power?: string;
  toughness?: string;
  imageUrl?: string;
}

// base interface for all API responses
export interface BaseApiResponse {
  status: number;
  [key: string]: unknown;
}

// define a generic structure for API responses
export interface ApiResponse<T> extends BaseApiResponse {
  cards: T[];
}
