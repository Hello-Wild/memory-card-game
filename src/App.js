import './App.css';
import { useEffect, useState } from 'react';
import SingleCard from './components/singleCard/SingleCard';


const cardImages = [
  {"src": "/img/card_front_1_200px.png", matched: false },
  {"src": "/img/card_front_2_200px.png", matched: false },
  {"src": "/img/card_front_3_200px.png", matched: false },
  {"src": "/img/card_front_4_200px.png", matched: false },
  {"src": "/img/card_front_5_200px.png", matched: false },
  {"src": "/img/card_front_6_200px.png", matched: false },
]

const App = () => {
  
  const [cards, setCards] = useState([]);
  const [turns, setTurns] = useState(0);
  const [choiceOne, setChoiceOne] = useState(null);
  const [choiceTwo, setChoiceTwo] = useState(null);
  const [disabled, setDisabled] = useState(false);
  
  //shuffle cards
  const shuffleCards = () => {
    const shuffledCards = [...cardImages, ...cardImages] //duplicate each card into a new array
      .sort(() => Math.random() - 0.5) //randomize card's order in the new array
      .map((card) => ({ ...card, id: Math.random() })); //add a random number to each card

    setChoiceOne(null);
    setChoiceTwo(null);
    setCards(shuffledCards); //set the new shuffled cards into the state
    setTurns(0); //reset the turns
  }

  // set choices into states
  const handleChoice = (card) => {
    console.log(card)
    choiceOne === null ? setChoiceOne(card) : setChoiceTwo(card);
  }

  // compare 2 selected cards
  useEffect(() => {
  
    if (choiceOne != null && choiceTwo != null) {
      setDisabled(true) // get the two cards out of the remaining cards

      if (choiceOne.src === choiceTwo.src) { // check if both choices are the same
        setCards(prevCards => {
          return prevCards.map(card => {
            if (card.src === choiceOne.src || card.src === choiceTwo.src) {
              return { ...card, matched: true }; // set card choices "matched" property to true 
            } else {
              return card;
            } 
          })
        })
        resetChoicesIncreaseTurns();

      } else {
        setTimeout(() =>  resetChoicesIncreaseTurns(), 1000); // wait 1 second before resetting the choices
      }
    }
  }, [choiceOne, choiceTwo]);

  console.log(cards);

  // reset choises & increase turn
  const resetChoicesIncreaseTurns = () => {
    setChoiceOne(null);
    setChoiceTwo(null);
    setTurns(prevTurns => prevTurns + 1);
    setDisabled(false);
  }

  return (
      <div className="App">

        <h1>Mayan Memory</h1>
        <button onClick={shuffleCards}>New Game</button>
        <p>Turns : {turns}</p> 

      <div className="card-grid">
        {cards.map((card) => (
          <SingleCard 
          key={card.id} 
          card={card} 
          handleChoice={handleChoice}
          flipped={ card === choiceOne || card === choiceTwo || card.matched === true }
          disabled={disabled}
          />
        ))}
      </div>
      </div>
  );

}


export default App;
