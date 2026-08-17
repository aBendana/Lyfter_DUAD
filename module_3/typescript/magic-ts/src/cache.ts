import { MagicCard } from "./types";

const cardCache = new Map<string, MagicCard[]>();

// get cached cards by key
export function getCachedCards(key: string): MagicCard[] | undefined {
  return cardCache.get(key);
}

// set cached cards by key
export function setCachedCards(key: string, cards: MagicCard[]): void {
  cardCache.set(key, cards);
}

// checks if the search key has cached cards
export function hasCachedCards(key: string): boolean {
  return cardCache.has(key);
}

// clear the cache
export function clearCache(): void {
  cardCache.clear();
}
