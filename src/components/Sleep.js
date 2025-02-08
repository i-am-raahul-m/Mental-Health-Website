import React from 'react';

function Sleep() {
  const sleepAids = [
    { title: 'White Noise', src: '/sleep/White-Noise-60min.mp3' },
    { 
      title: 'Binaural Beats', 
      src: [
        '/sleep/sleep1.mp3',
        '/sleep/sleep2.mp3',
        '/sleep/sleep3.mp3'
      ] 
    }
  ];

  return (
    <div className="sleep">
      <h2>Sleep Aids</h2>
      <div className="sleep-aids">
        {sleepAids.map((aid, index) => (
          <div key={index} className="sleep-aid">
            <h3>{aid.title}</h3>
            {Array.isArray(aid.src) ? (
              aid.src.map((song, idx) => (
                <audio key={idx} controls src={song}>
                  Your browser does not support the audio element.
                </audio>
              ))
            ) : (
              <audio controls src={aid.src}>
                Your browser does not support the audio element.
              </audio>
            )}
          </div>
        ))}
      </div>
      <div className="youtube-videos">
        <h3>Relaxing YouTube Videos</h3>
        <div className="video">
          <h1>Relaxing Art</h1>
          <iframe 
            width="560" 
            height="315" 
            src="https://www.youtube.com/embed/SrN4A9rVXj0" 
            title="YouTube video 1" 
            frameBorder="0" 
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
            allowFullScreen
          ></iframe>
        </div>
        <div className="video">
          <h1>Bed Time Stories</h1>
          <iframe 
            width="560" 
            height="315" 
            src="https://www.youtube.com/embed/_q5L0JLi0zo" 
            title="YouTube video 2" 
            frameBorder="0" 
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
            allowFullScreen
          ></iframe>
        </div>
      </div>
      <div className="sleep-tips">
        <h3>Sleep Tips</h3>
        <ul>
          <li>Maintain a Consistent Sleep Schedule</li>
          <li>Create a Restful Environment</li>
          <li>Limit Exposure to Light Before Bed</li>
          <li>Engage in Regular Physical Activity</li>
          <li>Be Mindful of Food and Drink</li>
          <li>Establish a Relaxing Pre-Sleep Routine</li>
          <li>Limit Daytime Naps</li>
          <li>Manage Stress and Anxiety</li>
          <li>Limit Screen Time Before Bed</li>
          <li>Optimize Bedroom Temperature</li>
          <li>Use Comfortable Bedding</li>
        </ul>
      </div>
    </div>
  );
}

export default Sleep;
