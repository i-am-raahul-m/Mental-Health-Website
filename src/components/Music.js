import React, { useState } from 'react';

function Music() {
  const genres = ['Classical', 'Lofi', 'Ambient', 'Nature'];
  const [selectedGenre, setSelectedGenre] = useState('Classical');

  // Dummy playlists for demonstration purposes
  const playlists = {
    Classical: [
      { title: 'Keys of Moon', src: 'keys-of-moon.mp3' },
      { title: 'Make a Wish', src: 'make-a-wish.mp3' }
    ],
    Lofi: [
      { title: 'Downtown Glow', src: 'downtown-glow.mp3' },
      { title: 'Storm Clouds', src: 'storm-clouds.mp3' }
    ],
    Ambient: [{ title: 'Contemplate the Stars', src: 'contemplate-the-stars.mp3' }],
    Nature: [
      { title: 'Forest Chirpings', src: 'forest-chirpings.mp3' },
      { title: 'Soft Rain', src: 'rain.mp3' }
    ]
  };

  return (
    <div className="music">
      <h2>Relaxing Music</h2>
      <div className="genre-tabs">
        {genres.map((genre) => (
          <button
            key={genre}
            className={selectedGenre === genre ? 'active' : ''}
            onClick={() => setSelectedGenre(genre)}
          >
            {genre}
          </button>
        ))}
      </div>
      <div className="playlist">
        <h3>{selectedGenre} Playlist</h3>
        {playlists[selectedGenre]?.map((track, index) => (
          <div key={index} className="track">
            <p>{track.title}</p>
            <audio controls src={track.src}>
              Your browser does not support the audio element.
            </audio>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Music;
