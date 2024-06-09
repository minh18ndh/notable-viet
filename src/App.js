import './App.css';
import api from "./api/axiosConfig";
import { useState, useEffect } from 'react';
import MapComponent from './MapComponent';

function App() {
  const [viets, setViets] = useState([]);
  const [theme, setTheme] = useState('dark');
  const [showTooltip, setShowTooltip] = useState(false);

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

  const toggleTooltip = () => {
    setShowTooltip(!showTooltip);
  };

  const appStyle = {
    backgroundColor: theme === 'dark' ? '#262626ff' : '#d4dadc',
    textAlign: 'center',
  };

  const buttonStyle = {
    backgroundImage: `url(${process.env.PUBLIC_URL}/${theme === 'dark' ? 'moon.gif' : 'sun.gif'})`
  };

  const infoButtonStyle = {
    backgroundImage: `url(${process.env.PUBLIC_URL}/info.gif)`
  };

  return (
    <div className="App" style={appStyle}>
      <button
        className="theme-toggle-button"
        style={buttonStyle}
        onClick={toggleTheme}
        onMouseEnter={(e) => e.currentTarget.style.backgroundImage = `url(${process.env.PUBLIC_URL}/${theme === 'dark' ? 'sun.gif' : 'moon.gif'})`}
        onMouseLeave={(e) => e.currentTarget.style.backgroundImage = `url(${process.env.PUBLIC_URL}/${theme === 'dark' ? 'moon.gif' : 'sun.gif'})`}
      ></button>
      <button
        className="info-button"
        style={infoButtonStyle}
        onClick={toggleTooltip}
        title="This website displays notable people who have at least 1/4 Vietnamese blood or Vietnamese nationality."
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
