import React, { useState } from 'react';

function Therapy() {
  const therapists = [
    { id: 1, name: 'Dr. Smith', specialty: 'Anxiety', rating: 4.8 },
    { id: 2, name: 'Dr. Johnson', specialty: 'Depression', rating: 4.6 },
    { id: 3, name: 'Dr. Lee', specialty: 'Relationship Issues', rating: 4.9 }
  ];

  const [selectedTherapist, setSelectedTherapist] = useState(null);

  const handleBookSession = (therapist) => {
    setSelectedTherapist(therapist);
  };

  const handleCloseModal = () => {
    setSelectedTherapist(null);
  };

  return (
    <div className="therapy">
      <h2>Therapy Sessions</h2>
      <div className="therapist-list">
        {therapists.map((therapist) => (
          <div key={therapist.id} className="therapist-card">
            <h3>{therapist.name}</h3>
            <p>Specialty: {therapist.specialty}</p>
            <p>Rating: {therapist.rating}</p>
            <button onClick={() => handleBookSession(therapist)}>
              Book Session
            </button>
          </div>
        ))}
      </div>

      {selectedTherapist && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={handleCloseModal}>
              &times;
            </span>
            <h3>Book a Session with {selectedTherapist.name}</h3>
            <p>Please contact us to schedule your session.</p>
            <p>
              Email: therapy@example.com <br />
              Phone: 123-456-7890
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

export default Therapy;
