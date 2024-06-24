import './App.css';
import { ReactComponent as PatternDivider } from './pattern-divider-desktop.svg';
import { ReactComponent as Dice} from './icon-dice.svg';
import React, { useState, useEffect } from 'react';


function App() {
  const [advice, setAdvice] = useState('');
  const [id, setId] = useState(null);
  const [clicked, setClicked] = useState(false);
  const handleClick = () => {
    setClicked(!clicked);
  }
  useEffect(() => {
    const apiUrl = 'https://api.adviceslip.com/advice';
    fetch(apiUrl)
      .then(response => {
        if(!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        setId(data.slip.id);
        setAdvice(data.slip.advice);
      })
      .catch(error => {
        console.error('There has been a problem with your fetch operation:', error);
      });
  }, [clicked]);


  return (
    <div className="App">
      <div className="inner-box">
        <div className="header">
          <p>A D V I C E # {id}</p>
        </div>

        <div className="advice">
          "{advice || "Advice will be displayed here."}"
        </div>

        <div className="pattern">
          <PatternDivider/>
        </div>

        <div className="dice" onClick={handleClick}>
          <Dice/>
        </div>
      </div>
    </div>
  );
}

export default App;
