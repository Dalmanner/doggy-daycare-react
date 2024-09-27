import { Link } from 'react-router-dom';
import placeholderImage from '../assets/dog.png'; // Importera placeholder-bild
import '../App.css';

const DogCard = ({ dog }) => {
  const imageUrl = dog.img || placeholderImage; // Använd placeholder om ingen bild finns

  return (
    <div className='Card'>
      <h3>{dog.name}</h3>
      {/* Använd onError för att hantera om bilden inte laddas */}
      <img
        src={imageUrl}
        alt={dog.name}
        className="thumbnail"
        onError={(e) => {
          e.target.onerror = null; // Förhindra oändlig loop
          e.target.src = placeholderImage; // Ställ in placeholder-bilden
        }}
      />
      <p>{dog.breed.charAt(0).toUpperCase() + dog.breed.slice(1)}</p>
      <Link to={`/catalog/${dog.chipNumber}`}>Visa mer</Link>
    </div>
  );
};

export default DogCard;
