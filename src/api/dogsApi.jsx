// Uppdatera URL till den nya JSON-filen
const apiUrl = 'https://api.jsonbin.io/v3/b/66f2869bad19ca34f8abd524';

// Hämtar alla hundar med API-nyckel i headers
const getDogs = async () => {
  const response = await fetch(apiUrl, {
    method: 'GET', // Valfritt, standardvärdet är GET
    headers: {
      'x-master-key': '$2a$10$qgyGkDZJcPg0pekUmR6NaejpHK5HgcaPl9e38Sx./JtNiY.r50PCC', // Lägg till din API-nyckel här
      'Content-Type': 'application/json' // Sätt rätt Content-Type för JSON
    }
  });
  
  if (!response.ok) {
    throw new Error('Det gick inte att hämta data: ' + response.statusText);
  }
  
  const data = await response.json();
  return data.record; // Returnera JSON-datan, som innehåller "record" där hundarna finns
};

// Hämta en specifik hund baserat på chipNumber
const getDogByChipNumber = async (chipNumber) => {
  const dogs = await getDogs(); // Hämta alla hundar
  return dogs.find((dog) => dog.chipNumber === chipNumber); // Hitta hunden baserat på chipNumber
};

const addDog = async (newDog) => {
  // Hämta alla existerande hundar
  const currentDogs = await getDogs();

  // Lägg till den nya hunden i listan
  const updatedDogs = [...currentDogs, newDog];

  // Skicka tillbaka den uppdaterade listan till servern (endast arrayen, inte som ett objekt)
  const response = await fetch(apiUrl, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'x-master-key': '$2a$10$qgyGkDZJcPg0pekUmR6NaejpHK5HgcaPl9e38Sx./JtNiY.r50PCC'
    },
    body: JSON.stringify(updatedDogs) // Skicka arrayen direkt
  });

  if (!response.ok) {
    throw new Error('Error adding dog');
  }

  return await response.json();
};


export default { addDog, getDogs, getDogByChipNumber };

