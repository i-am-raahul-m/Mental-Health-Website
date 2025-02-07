import React from 'react';

function Sleep() {
  const sleepAids = [
    { title: 'White Noise', src: 'White-Noise-60min.mp3' },
    { title: 'Rain Sounds', src: 'https://example.com/rainsounds.mp3' },
    { title: 'Sleep Story', src: 'https://example.com/sleepstory.mp3' }
  ];

  return (
    <div className="sleep">
      <h2>Sleep Aids</h2>
      <div className="sleep-aids">
        {sleepAids.map((aid, index) => (
          <div key={index} className="sleep-aid">
            <h3>{aid.title}</h3>
            <audio controls src={aid.src}>
              Your browser does not support the audio element.
            </audio>
          </div>
        ))}
      </div>
      <div className="sleep-tips">
        <h3>Sleep Tips</h3>
        <ul>
          <li>Maintain a regular sleep schedule.</li>
          <li>Create a calming bedtime routine.</li>
          <li>Avoid screens before bed.</li>
        </ul>
      </div>
    </div>
  );
}

export default Sleep;
