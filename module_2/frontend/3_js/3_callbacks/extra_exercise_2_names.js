const namesOne = [
  "Alejandro",
  "Sofía",
  "Mateo",
  "Valentina",
  "Javier",
  "Lucía",
  "Diego",
  "Elena",
  "Nicolás",
  "Camila",
];

const namesTwo = [
  "Alejandro",
  "Roger",
  "Carlos",
  "Valentina",
  "Xavier",
  "Lucrecia",
  "Diego",
  "Eliberto",
  "Nicolás",
  "Catalina",
];

function printingNames(coincidenceDocument) {
  console.log(`All the names coincidences are: ${coincidenceDocument}`);
}

function inspectingNames(nameDocumentOne, nameDocumentTwo, printingDocuments) {
  const coincidences = [];
  for (let i = 0; i < nameDocumentOne.length; i++) {
    for (let j = 0; j < nameDocumentTwo.length; j++) {
      if (nameDocumentOne[i] === nameDocumentTwo[j]) {
        coincidences.push(nameDocumentOne[i]);
        console.log(`The name ${nameDocumentOne[i]} is in both documents`);
      }
    }
  }
  printingDocuments(coincidences);
}

function namesCoincidence(nameDocumentOne, nameDocumentTwo, inspectingNames) {
  inspectingNames(nameDocumentOne, nameDocumentTwo, printingNames);
}

namesCoincidence(namesOne, namesTwo, inspectingNames);
