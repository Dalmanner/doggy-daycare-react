import { useParams, useNavigate } from 'react-router-dom'; // Lägg till useNavigate
import { useState, useEffect } from 'react';
import dogsApi from '../api/dogsApi';
import PlaceholderDog from '../components/PlaceholderDog';
import '/src/App.css'

const DogDetailPage = () => {
  const { chipNumber } = useParams();
  const navigate = useNavigate(); // Skapa en navigate-funktion
  const [dog, setDog] = useState(null);

  useEffect(() => {
    dogsApi.getDogByChipNumber(chipNumber).then((data) => setDog(data || PlaceholderDog));
  }, [chipNumber]);

  if (!dog) return <p>Laddar...</p>;

  const imageUrl = dog.img || PlaceholderDog.img;

  return (
    <div className="container mx-auto p-6">
      <div className="bg-white rounded-lg shadow-lg p-6 max-w-lg mx-auto transition-all transform hover:scale-105">

        <div>
          <h1 className="text-3xl font-bold mb-2">{dog.name}</h1>
          <p className="text-lg mb-2"><strong>Ras:</strong> {dog.breed}</p>
          <p className="text-lg mb-2"><strong>Ålder:</strong> {dog.age} år</p>
          <p className="text-lg mb-2"><strong>Ägare:</strong> {dog.owner.name} {dog.owner.lastName}</p>
          <p className="text-lg mb-2"><strong>Telefonnummer:</strong> {dog.owner.phoneNumber}</p>
          <p className="text-lg mb-2"><strong>Chipnummer:</strong> {dog.chipNumber}</p>
          <p className="text-lg"><strong>{dog.present ? 'Närvarande' : 'Inte närvarande'}</strong></p>
        </div>

        {/* Tillbaka-knapp */}
        <button
          className="back-button" // Stilklass för knappen
          onClick={() => navigate(-1)} // Navigera tillbaka
        >
          Tillbaka
        </button>

        <img
          src={imageUrl}
          alt={dog.name}
          className="detail-img"
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = PlaceholderDog.img;
          }}
        />
      </div>
    </div>
  );
};

export default DogDetailPage;









