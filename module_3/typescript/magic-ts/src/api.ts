import fetch from "node-fetch";
import {
  BaseApiResponse,
  MagicCard,
  Rarity,
  ApiResponse,
  MagicColor,
} from "./types";
import { getCachedCards, setCachedCards, hasCachedCards } from "./cache";

//

// generic function to fetch data from the Magic: The Gathering API
export async function fetchFromApi<T extends BaseApiResponse>(
  endpoint: string,
): Promise<T> {
  const url = `https://api.magicthegathering.io/v1/${endpoint}`;

  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error(`Error in API: ${response.statusText}`);

    // validate that the response is an object and has the expected structure
    const data = await response.json();
    if (!data || typeof data !== "object") {
      throw new Error("Invalid API response format");
    }

    return data as T; // cast to the expected type T
  } catch (error) {
    console.error("Error in request:", error);
    throw error;
  }
}

// function to search cards by name
export async function getCardsByName(name: string): Promise<MagicCard[]> {
  // check if the cards are already cached
  const cacheKeyName = `name:${name}`;

  const cachedCards = getCachedCards(cacheKeyName);
  if (cachedCards) {
    console.log(`🗂️ Returning cached cards for name: ${name}`);
    return cachedCards;
  }

  try {
    const data = await fetchFromApi<ApiResponse<MagicCard>>(
      `cards?name=${encodeURIComponent(name)}`,
    );

    // set the fetched cards in cache
    setCachedCards(cacheKeyName, data.cards);

    return data.cards;
  } catch (error) {
    console.warn(`Error fetching cards by name: ${name}`);
    console.error(error);
    return []; // return an empty array in case of error
  }
}

// get cards by color
export async function getCardsByColor(color: MagicColor): Promise<MagicCard[]> {
  // check if the cards are already cached
  const cacheKeyColor = `color:${color}`;

  const cachedCards = getCachedCards(cacheKeyColor);
  if (cachedCards) {
    console.log(`🗂️ Returning cached cards for name: ${color}`);
    return cachedCards;
  }

  try {
    const data = await fetchFromApi<ApiResponse<MagicCard>>(
      `cards?colors=${encodeURIComponent(color)}`,
    );

    // set the fetched cards in cache
    setCachedCards(cacheKeyColor, data.cards);

    return data.cards;
  } catch (error) {
    console.warn(`Error fetching cards by color: ${color}`);
    console.error(error);
    return []; // return an empty array in case of error
  }
}

// get cards by rarity
export async function getCardsByRarity(rarity: Rarity): Promise<MagicCard[]> {
  // check if the cards are already cached
  const cacheKeyRarity = `rarity:${rarity}`;

  const cachedCards = getCachedCards(cacheKeyRarity);
  if (cachedCards) {
    console.log(`🗂️ Returning cached cards for rarity: ${rarity}`);
    return cachedCards;
  }

  try {
    const data = await fetchFromApi<ApiResponse<MagicCard>>(
      `cards?rarity=${encodeURIComponent(rarity)}`,
    );

    // set the fetched cards in cache
    setCachedCards(cacheKeyRarity, data.cards);

    return data.cards;
  } catch (error) {
    console.warn(`Error fetching cards by rarity: ${rarity}`);
    console.error(error);
    return []; // return an empty array in case of error
  }
}
