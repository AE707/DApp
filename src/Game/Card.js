function Card({ card, handleClick, firstCardId, secondCardId, stopflip }) {
  const isToggled = firstCardId === card.id || secondCardId === card.id;

  return (
    <div className="item">
      <div className={isToggled ? "toggled" : ""}>
        <img className="face" src={card.img} alt="face" />
        <div className="back" onClick={() => !stopflip && handleClick(card)}>
          {" "}
        </div>
      </div>
    </div>
  );
}

export default Card;
