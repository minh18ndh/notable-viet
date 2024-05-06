import './App.css';
import api from "./api/axiosConfig";
import { useState, useEffect } from 'react';
import MapComponent from './MapComponent';

function App() {
  const [viets, setViets] = useState([]);

  useEffect(() => {
    const getViets = async () => {
      try {
        const response = await api.get("/api/v1/notable-viet");
        setViets(response.data);
      } catch (err) {
        console.log(err);
      }
    };

    getViets();
  }, []);

  return (
    <div className="App">
      <MapComponent viets={viets} />
    </div>
  );
}

export default App;
