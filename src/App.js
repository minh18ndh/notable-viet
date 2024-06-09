import './App.css';
import api from "./api/axiosConfig";
import { useState, useEffect } from 'react';
import MapComponent from './MapComponent';

function App() {
  const [viets, setViets] = useState([]);
  const [theme, setTheme] = useState('dark');

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

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === 'dark' ? 'light' : 'dark'));
  };

  const appStyle = {
    backgroundColor: theme === 'dark' ? '#262626ff' : '#d4dadc',
    textAlign: 'center',
  };

  const buttonStyle = {
    backgroundImage: `url(${process.env.PUBLIC_URL}/${theme === 'dark' ? 'night.png' : 'day.png'})`
  };

  return (
    <div className="App" style={appStyle}>
      <button
        className="theme-toggle-button"
        style={buttonStyle}
        onClick={toggleTheme}
        onMouseEnter={(e) => e.currentTarget.style.backgroundImage = `url(${process.env.PUBLIC_URL}/${theme === 'dark' ? 'day.png' : 'night.png'})`}
        onMouseLeave={(e) => e.currentTarget.style.backgroundImage = `url(${process.env.PUBLIC_URL}/${theme === 'dark' ? 'night.png' : 'day.png'})`}
      ></button>
      <div className={theme === 'dark' ? 'menu-dark' : 'menu-light'}>
        <h3>Notable Vietnamese <img src={`${process.env.PUBLIC_URL}/vn.ico`} alt="vnflag" /></h3>
        <p>Deeply inspired by <a href="https://tjukanovt.github.io/notable-people" target="_blank">Notable people by Topi Tjukanov</a>.</p>
      </div>
      <MapComponent viets={viets} theme={theme} />
    </div>
  );
}

export default App;
