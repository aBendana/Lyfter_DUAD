import { getCardsByName, getCardsByColor, getCardsByRarity } from "./api";

async function main() {
  // making a search by name
  const cardsByName = await getCardsByName("Black Lotus");

  if (cardsByName.length === 0) {
    console.log("🚫 Cards not found or an error occurred.");
    return;
  }

  cardsByName.forEach((cardName) => {
    console.log(`🎴 Name: ${cardName.name}`);
    console.log(`🪄 Type: ${cardName.type}`);
    console.log(`🌈 Colors: ${cardName.colors?.join(", ") ?? "Colorless"}`);
    console.log(`🖌️ Rarity: ${cardName.rarity}`);
    console.log(`🗂️ Set: ${cardName.set}`);
    console.log(`📖 Text: ${cardName.text ?? "No text available"}`);
    console.log("=====================================");
  });

  //making a search by color
  const cardsByColor = await getCardsByColor("Green");

  if (cardsByColor.length === 0) {
    console.log("🚫 Cards not found or an error occurred.");
    return;
  }

  cardsByColor.forEach((cardColor) => {
    console.log(`🎴 Name: ${cardColor.name}`);
    console.log(`🪄 Type: ${cardColor.type}`);
    console.log(`🌈 Colors: ${cardColor.colors?.join(", ") ?? "Colorless"}`);
    console.log(`🖌️ Rarity: ${cardColor.rarity}`);
    console.log(`🗂️ Set: ${cardColor.set}`);
    console.log(`📖 Text: ${cardColor.text ?? "No text available"}`);
    console.log("=====================================");
  });

  //making a search by rarity
  const cardsByRarity = await getCardsByRarity("Mythic Rare");

  if (cardsByRarity.length === 0) {
    console.log("🚫 Cards not found or an error occurred.");
    return;
  }

  cardsByRarity.forEach((cardRarity) => {
    console.log(`🎴 Name: ${cardRarity.name}`);
    console.log(`🪄 Type: ${cardRarity.type}`);
    console.log(`🌈 Colors: ${cardRarity.colors?.join(", ") ?? "Colorless"}`);
    console.log(`🖌️ Rarity: ${cardRarity.rarity}`);
    console.log(`🗂️ Set: ${cardRarity.set}`);
    console.log(`📖 Text: ${cardRarity.text ?? "No text available"}`);
    console.log("=====================================");
  });
}

main();
