import React, { useState, useRef } from 'react';

function Therapy() {
  const therapists = [
    { id: 1, name: 'Dr. Smith', specialty: 'Anxiety', rating: 4.8 },
    { id: 2, name: 'Dr. Johnson', specialty: 'Depression', rating: 4.6 },
    { id: 3, name: 'Dr. Lee', specialty: 'Relationship Issues', rating: 4.9 }
  ];

  const [selectedTherapist, setSelectedTherapist] = useState(null);
  const [uploadedDocument, setUploadedDocument] = useState(null);
  const [audioBlob, setAudioBlob] = useState(null);
  const [isRecording, setIsRecording] = useState(false);
  const [message, setMessage] = useState('');
  const [isReadyToBook, setIsReadyToBook] = useState(false);
  const mediaRecorderRef = useRef(null);
  const fileInputRef = useRef(null);

  const handleBookSession = (therapist) => {
    setSelectedTherapist(therapist);
    setUploadedDocument(null);
    setAudioBlob(null);
    setMessage('');
    setIsReadyToBook(false);
  };

  const handleCloseModal = () => {
    setSelectedTherapist(null);
  };

  const handleUploadDocuments = (event) => {
    const file = event.target.files[0];
    if (file) {
      setUploadedDocument(file.name);
      setIsReadyToBook(true);
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current.click();
  };

  const handleStartRecording = async () => {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    const mediaRecorder = new MediaRecorder(stream);
    const audioChunks = [];

    mediaRecorder.ondataavailable = (event) => {
      audioChunks.push(event.data);
    };

    mediaRecorder.onstop = () => {
      const audioBlob = new Blob(audioChunks, { type: 'audio/wav' });
      setAudioBlob(audioBlob);
      setIsReadyToBook(true);
    };

    mediaRecorderRef.current = mediaRecorder;
    mediaRecorder.start();
    setIsRecording(true);
  };

  const handleStopRecording = () => {
    mediaRecorderRef.current?.stop();
    setIsRecording(false);
  };

  const handleSendVoiceMessage = () => {
    if (audioBlob) {
      alert('Voice message sent to ' + selectedTherapist.name);
    } else {
      alert('No voice message recorded!');
    }
  };

  const handleSendMessage = () => {
    if (message.trim()) {
      alert('Message sent to ' + selectedTherapist.name + ': ' + message);
      setMessage('');
      setIsReadyToBook(true);
    } else {
      alert('No message written!');
    }
  };

  const handleFinalBooking = () => {
    alert('Session booked with ' + selectedTherapist.name);
    handleCloseModal();
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
        <div className="modal" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', background: 'rgba(0, 0, 0, 0.5)' }}>
          <div className="modal-content" style={{ background: 'white', padding: '20px', borderRadius: '10px', textAlign: 'center' }}>
            <span className="close" onClick={handleCloseModal}>
              &times;
            </span>
            <h3>Book a Session with {selectedTherapist.name}</h3>
            <p>Please select an option below:</p>
            <div className="booking-options">
              <input
                type="file"
                ref={fileInputRef}
                style={{ display: 'none' }}
                onChange={handleUploadDocuments}
              />
              <button onClick={triggerFileInput}>Upload Medical Documents</button>
              {uploadedDocument && <p>Uploaded: {uploadedDocument}</p>}
              <hr />
              {isRecording ? (
                <button onClick={handleStopRecording}>Stop Recording</button>
              ) : (
                <button onClick={handleStartRecording}>Record Voice Message</button>
              )}
              {audioBlob && (
                <div>
                  <p>Voice Message Recorded</p>
                  <audio controls>
                    <source src={URL.createObjectURL(audioBlob)} type="audio/wav" />
                    Your browser does not support the audio element.
                  </audio>
                </div>
              )}
              <button onClick={handleSendVoiceMessage}>Send Voice Message</button>
              <hr />
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Write your message here..."
                rows="4"
                style={{ width: '100%', marginTop: '10px' }}
              ></textarea>
              <button onClick={handleSendMessage}>Send Message</button>
            </div>
            {isReadyToBook && (
              <button onClick={handleFinalBooking} style={{ marginTop: '20px' }}>
                Book Session
              </button>
            )}
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
