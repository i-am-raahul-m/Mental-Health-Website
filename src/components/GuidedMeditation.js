import React from 'react';

function GuidedMeditation() {
  const sessions = [
    {
      title: 'Anxiety Control Meditation',
      duration: '10 min',
      videoId: 'ez3GgRqhNvA'
    },
    {
      title: 'Stress Relief Meditation',
      duration: '5 min',
      videoId: 'L1QOh-n-eus'
    },
    {
      title: 'Breathing Meditation',
      duration: '10 min',
      videoId: 'VUjiXcfKBn8'
    }
  ];

  return (
    <div className="guided-meditation">
      <h2>Guided Meditation Sessions</h2>
      <div className="sessions">
        {sessions.map((session, index) => (
          <div key={index} className="session">
            <h3>{session.title}</h3>
            <p>Duration: {session.duration}</p>
            <div className="video-container">
              <iframe
                width="560"
                height="315"
                src={`https://www.youtube.com/embed/${session.videoId}`}
                frameBorder="0"
                allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                title={session.title}
              ></iframe>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default GuidedMeditation;
