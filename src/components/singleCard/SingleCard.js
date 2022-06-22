import React from 'react';
import "./SingleCard.css"

const SingleCard = ({card, handleChoice, flipped, disabled}) => {

  const handleClick = () => {
    if (!disabled) {
      handleChoice(card);
    }
  }

  return (
    <div className="card" >  
      <div className={flipped === true ? "flipped" : ""} >
        <img 
        className="front" 
        src={card.src} 
        alt="card front" />
        <img 
          className="back" 
          src="/img/card_back_200px.png"
          onClick={handleClick}
          alt="card back" />
      </div>
    </div>
  )
}

export default SingleCard;