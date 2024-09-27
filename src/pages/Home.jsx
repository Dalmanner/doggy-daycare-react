import { Link } from 'react-router-dom';
import '/src/App.css'



const Home = () => {
  return (
    <div className="welcome">
      <h1>Välkommen till Doggy Daycare!</h1>
      <p>Vi tar hand om din fyrbenta vän med kärlek och omsorg.</p>
      <Link to="/catalog">Gå till katalogen</Link>
    </div>
  );
};

export default Home;

  