import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // Importera useNavigate
import dogsApi from '../api/dogsApi';
import PlaceholderDog from '../components/PlaceholderDog';
import '../App.css';

const DogList = () => {
  const [dogs, setDogs] = useState([]);
  const [sortOption, setSortOption] = useState('name');
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate(); // Skapa en navigate-funktion

  useEffect(() => {
    const fetchDogs = async () => {
      try {
        const dogsData = await dogsApi.getDogs();
        setDogs(dogsData);
      } catch (error) {
        console.error('Error fetching dogs:', error);
        setDogs([PlaceholderDog]);
      }
    };
    fetchDogs();
  }, []);

  const handleDogClick = (dog) => {
    // När en hund klickas, navigera till detaljvyn med chipNumber i URL:en
    navigate(`/catalog/${dog.chipNumber}`);
  };

  // Filtrera och sortera hundar
  const filterAndSortDogs = (dogsList) => {
    if (!Array.isArray(dogsList)) {
      return [];
    }

    let filteredDogs = dogsList;
    if (searchQuery) {
      filteredDogs = dogsList
        .map((dog) => {
          let score = 0;
          const lowerQuery = searchQuery.toLowerCase();
          
          if (dog.name.toLowerCase().includes(lowerQuery)) score += 2;
          if (dog.breed.toLowerCase().includes(lowerQuery)) score += 1;
          if (dog.chipNumber.toLowerCase().includes(lowerQuery)) score += 3;
          if (dog.owner.name.toLowerCase().includes(lowerQuery)) score += 2;
          if (dog.owner.lastName.toLowerCase().includes(lowerQuery)) score += 2;
          if (dog.owner.phoneNumber.toLowerCase().includes(lowerQuery)) score += 3;

          return { ...dog, score };
        })
        .filter((dog) => dog.score > 0)
        .sort((a, b) => b.score - a.score);
    }

    switch (sortOption) {
      case 'name':
        return [...filteredDogs].sort((a, b) => a.name.localeCompare(b.name));
      case 'age':
        return [...filteredDogs].sort((a, b) => a.age - b.age);
      case 'owner':
        return [...filteredDogs].sort((a, b) => a.owner.name.localeCompare(b.owner.name));
      case 'present':
        return [...filteredDogs].sort((a, b) => (a.present === b.present ? 0 : a.present ? -1 : 1));
      case 'chipNumber':
        return [...filteredDogs].sort((a, b) => a.chipNumber - b.chipNumber);
      case 'breed':
        return [...filteredDogs].sort((a, b) => a.breed.localeCompare(b.breed));
      default:
        return filteredDogs;
    }
  };

  const renderListView = () => {
    const filteredDogs = filterAndSortDogs(dogs);
    return (
      <div className="grid">
        {filteredDogs.map((dog) => (
          <div key={dog.chipNumber} className="card" onClick={() => handleDogClick(dog)}>
            <img
              src={dog.img}
              alt={dog.name}
              className="thumbnail"
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = PlaceholderDog.img;
              }}
            />
            <div className="card-content">
              <h2>{dog.name}</h2>
              <p>{dog.breed.charAt(0).toUpperCase() + dog.breed.slice(1)}</p>
            </div>
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="container">
      <h1>Våra Hundar</h1>

      <div className="search-container">
        <input
          type="text"
          placeholder="Sök..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="search-input"
        />
      </div>

      <div className="sort-container">
        <label htmlFor="sort">Sortera efter: </label>
        <select
          id="sort"
          value={sortOption}
          onChange={(e) => setSortOption(e.target.value)}
          className="select"
        >
          <option value="name">Namn (A-Ö)</option>
          <option value="age">Ålder</option>
          <option value="present">Närvarande/Inne</option>
          <option value="breed">Ras</option>
        </select>          
      </div>

      {renderListView()}
    </div>
  );
};

export default DogList;


