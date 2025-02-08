import React from 'react';
import { Link } from 'react-router-dom';

function SelfCare() {
  return (
    <div className="self-care">
      <h2>Self-Care & Relationship</h2>

      <div className="minigames">
        <h3>Try These Stress-Relief Mini-Games</h3>
        <ul>
          <li><Link to="/bubble-wrap-pop">Bubble Wrap Pop</Link></li>
          <li><Link to="/breakout">Atari Breakout</Link></li>
          <li><Link to="/memory-match">Memory Match</Link></li>
        </ul>
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
