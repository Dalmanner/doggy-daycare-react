import placeholderImage from '../assets/dog.png'; // Importera placeholder-bild

// Placeholder-hund för saknade data
const PlaceholderDog = {
  name: "Okänd Hund",
  sex: "unknown",
  breed: "unknown",
  img: placeholderImage, // Använd lokal placeholder-bild
  present: false,
  age: "Okänd",
  chipNumber: "Ingen data",
  owner: {
    name: "Okänd",
    lastName: "Okänd",
    phoneNumber: "Ingen data"
  }
};

export default PlaceholderDog;
