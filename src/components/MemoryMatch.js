import React, { useState, useEffect } from 'react';

const cardImages = [
  { id: 1, src: '/games/sun.jpg', matched: false },
  { id: 2, src: '/games/moon.jpg', matched: false },
  { id: 3, src: '/games/star.jpg', matched: false },
  { id: 4, src: '/games/planet.jpg', matched: false },
  { id: 5, src: '/games/galaxy.png', matched: false },
  { id: 6, src: '/games/blackhole.webp', matched: false },
];

const shuffledCards = () => {
  const cards = [...cardImages, ...cardImages]
    .map(card => ({ ...card, id: Math.random() }))
    .sort(() => Math.random() - 0.5);
  return cards;
};

function MemoryMatch() {
  const [cards, setCards] = useState(shuffledCards());
  const [flippedCards, setFlippedCards] = useState([]);
  const [matchedPairs, setMatchedPairs] = useState(0);

  useEffect(() => {
    if (flippedCards.length === 2) {
      const [first, second] = flippedCards;
      if (cards[first].src === cards[second].src) {
        setCards(prevCards =>
          prevCards.map((card, index) => {
            if (index === first || index === second) {
              return { ...card, matched: true };
            }
            return card;
          })
        );
        setMatchedPairs(matchedPairs + 1);
        setFlippedCards([]);
      } else {
        setTimeout(() => setFlippedCards([]), 1000);
      }
    }
  }, [flippedCards, cards, matchedPairs]);

  const handleCardClick = (index) => {
    // Prevent clicking if the card is already matched or already flipped
    if (flippedCards.length < 2 && !flippedCards.includes(index) && !cards[index].matched) {
      setFlippedCards([...flippedCards, index]);
    }
  };

  return (
    <div className="memory-match">
      <h2>Memory Match Game</h2>
      <p>Find all matching pairs to win!</p>
      <div className="card-grid">
        {cards.map((card, index) => (
          <div
            key={card.id}
            className={`card ${flippedCards.includes(index) || card.matched ? 'flipped' : ''}`}
            onClick={() => handleCardClick(index)}
          >
            <img 
              src={flippedCards.includes(index) || card.matched ? card.src : '/games/back_side.png'} 
              alt="card" 
            />
          </div>
        ))}
      </div>
      <p>Matched Pairs: {matchedPairs} / {cardImages.length}</p>
      {matchedPairs === cardImages.length && <p>🎉 You Won! 🎉</p>}
    </div>
  );
}

export default MemoryMatch;
