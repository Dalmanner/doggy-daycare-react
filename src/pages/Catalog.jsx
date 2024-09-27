import React from 'react';
import DogList from '/src/components/DogList'; // Importera DogList-komponenten
import '/src/App.css'


const Catalog = () => {
  return (
    <div>
    
      <DogList /> {/* Använd DogList-komponenten */}
    </div>
  );
};

export default Catalog;

