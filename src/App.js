import './App.css';
import { useState } from 'react';

const cardImages = [
  { "src": "/img/helmet-1.png" },
  { "src": "/img/potion-1.png" },
  { "src": "/img/ring-1.png" },
  { "src": "/img/scroll-1.png" },
  { "src": "/img/shield-1.png" },
  { "src": "/img/sword-1.png" },
]

function App() {
  
  // initialize a state for cards
  const [cards, setCards] = useState([]);
  const [turns, setTurns] = useState(0);
  
  //shuffle cards
  const shuffleCards = () => {
    const shuffleCards = [...cardImages, ...cardImages] //duplicate each card into a new array
      .sort(() => Math.random() - 0.5) //randomize card's order in the new array
      .map((card) => ({ ...card, id: Math.random() })) //add a random number to each card

    setCards(shuffleCards); //set the new shuffled cards into the state
    setTurns(0); //reset the turns
  }

  console.log(cards, turns)

  return (
    <div className="App">
      <h1>Magic Match</h1>
      <button onClick={shuffleCards}>New Game</button>
    </div>
  );
}

export default App;
