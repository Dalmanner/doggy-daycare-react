import React, { useState } from 'react';
import dogsApi from '../api/dogsApi'; // Importera din API-funktion för att lägga till hundar
import { useNavigate } from 'react-router-dom';
import '/src/App.css'

const AddDogPage = () => {
  const navigate = useNavigate(); // Används för att navigera tillbaka efter inlämning
  const [formData, setFormData] = useState({
    name: '',
    sex: 'male',
    breed: '',
    img: '',
    present: false,
    age: 0,
    chipNumber: '',
    owner: {
      name: '',
      lastName: '',
      phoneNumber: ''
    }
  });

  // Hantera ändringar i formuläret
  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name.startsWith('owner.')) {
      const ownerField = name.split('.')[1];
      setFormData((prevData) => ({
        ...prevData,
        owner: {
          ...prevData.owner,
          [ownerField]: value
        }
      }));
    } else {
      setFormData((prevData) => ({ ...prevData, [name]: value }));
    }
  };

  // Skicka formuläret
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validera att ålder är ett nummer
    if (isNaN(formData.age)) {
      alert('Åldern måste vara ett nummer');
      return;
    }
    
    // Validera att bild-URL är korrekt (valfritt)
    if (!formData.img.startsWith('https://') && !formData.img.endsWith('.jpg') && !formData.img.endsWith('.png')) {
      alert('Ange en giltig bild-URL');
      return;
    }
  
    try {
      await dogsApi.addDog(formData);
      alert('Ny hund tillagd!');
      navigate('/');
    } catch (error) {
      console.error('Error adding dog:', error);
      alert('Misslyckades med att lägga till hund');
    }
  };
  

  return (
    <div className="add-dog">
      <h1 className="text-2xl font-bold mb-4">Lägg till ny hund</h1>
      <form onSubmit={handleSubmit}>
        <div className="add-input">
          <label>Namn:</label>
          <input className='add-text'type="text" name="name" value={formData.name} onChange={handleChange} required />
        </div>
        <div className="add-input">
          <label>Kön:</label>
          <select className='add-text' name="sex" value={formData.sex} onChange={handleChange}>
            <option value="male">Hane</option>
            <option value="female">Hona</option>
          </select>
        </div>
        <div className="add-input">
          <label>Ras:</label>
          <input className='add-text'type="text" name="breed" value={formData.breed} onChange={handleChange} required />
        </div>
        <div className="add-input">
          <label>Bild-URL:</label>
          <input className='add-text'type="url" name="img" value={formData.img} onChange={handleChange} required />
        </div>
        <div className="add-input">
          <label>Ålder:</label>
          <input className='add-text'type="number" name="age" value={formData.age} onChange={handleChange} required />
        </div>
        <div className="add-input">
          <label>Chipnummer:</label>
          <input className='add-text'type="text" name="chipNumber" value={formData.chipNumber} onChange={handleChange} required />
        </div>
        <div className="add-input">
          <label>Närvarande:</label>
          <input className='add-text'type="checkbox" name="present" checked={formData.present} onChange={(e) => setFormData((prevData) => ({ ...prevData, present: e.target.checked }))} />
        </div>
        <h3>Ägarinformation</h3>
        <div className="add-input">
          <label>Ägarens förnamn:</label>
          <input className='add-text'type="text" name="owner.name" value={formData.owner.name} onChange={handleChange} required />
        </div>
        <div className="add-input">
          <label>Ägarens efternamn:</label>
          <input className='add-text'type="text" name="owner.lastName" value={formData.owner.lastName} onChange={handleChange} required />
        </div>
        <div className="add-input">
          <label>Telefonnummer:</label>
          <input className='add-text'type="tel" name="owner.phoneNumber" value={formData.owner.phoneNumber} onChange={handleChange} required />
        </div>
        <button type="submit" className="submit-button">Lägg till hund</button>
      </form>
    </div>
  );
};

export default AddDogPage;
