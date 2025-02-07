import React, { useState } from 'react';

function SelfCare() {
  const [score, setScore] = useState(0);

  const handlePlayGame = () => {
    // Dummy game logic: Increase the score by a random value.
    setScore(score + Math.floor(Math.random() * 10) + 1);
  };

  return (
    <div className="self-care">
      <h2>Self-Care & Relationship</h2>
      <div className="minigame">
        <h3>Stress Relief Mini-Game</h3>
        <p>Click the button to release stress!</p>
        <button onClick={handlePlayGame}>Release Stress</button>
        <p>Your relaxation score: {score}</p>
      </div>
      <div className="self-care-tips">
        <h3>Self-Care Tips</h3>
        <ul>
          <li>Take regular breaks and practice deep breathing.</li>
          <li>Connect with loved ones and build supportive relationships.</li>
          <li>Engage in physical activities like yoga or walking.</li>
        </ul>
      </div>
    </div>
  );
}

export default SelfCare;
