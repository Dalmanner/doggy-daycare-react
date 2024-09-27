import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Catalog from './pages/Catalog';
import DogDetailPage from './pages/DogDetailPage';
import Navbar from './components/Navbar'; // Importera navbar
import '/src/App.css';
import AddDogPage from './pages/AddDogPage';

function App() {
  return (
    <>
      <Navbar /> {/* Navbar utanför router */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/catalog" element={<Catalog />} />
        <Route path="/catalog/:chipNumber" element={<DogDetailPage />} />
        <Route path='/add-dog' element={<AddDogPage />} />
      </Routes>
    </>
  );
}

export default App;



