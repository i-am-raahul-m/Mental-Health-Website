import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const articles = [
  {
    title: '13 Great Strategies To Relieve Stress and Improve Your Well-Being',
    summary:
      'Discover effective ways to manage stress, from mindfulness to journaling. Learn techniques to boost your mental well-being.',
    author: 'Sherri Gordon',
    link: 'https://www.health.com/how-to-relieve-stress-8777654',
  },
  {
    title: 'The Power of Journaling for Mental Health',
    summary:
      'Explore how journaling can help you process emotions, set goals, and improve mental clarity. Find out how to start today.',
    author: 'Jillian Anthony',
    link: 'https://www.vox.com/life/393304/journaling-how-to-artists-way-shadow-work-mental-health-habit-goals',
  },
  {
    title: 'The Impact of Digital Health Tools on Mental Well-being',
    summary:
      'Learn how digital tools are revolutionizing mental health care, offering new ways to track, support, and improve well-being.',
    author: 'Joonas Moilanen',
    link: 'https://www.frontiersin.org/journals/digital-health/articles/10.3389/fdgth.2023.1034724/full',
  },
  {
    title: 'Self-Care Plan for Students',
    summary:
      'Discover personalized self-care plans designed specifically for students to manage stress and improve well-being.',
    author: 'ChatGpt',
    link: 'https://www.aiforeducation.io/prompts/self-care-plan-for-students',
  },
  {
    title: 'How Mental Health Chatbots are Changing Support Systems',
    summary:
      'Explore the role of mental health chatbots in providing accessible and immediate support for mental well-being.',
    author: 'Michael Metcalf',
    link: 'https://getmarlee.com/blog/mental-health-chatbot',
  },
];

const gratitudePrompts = [
  "What is one thing that made you smile today?",
  "Who is someone you are grateful for and why?",
  "Recall a moment that brought you joy this week.",
  "What is one small thing you appreciate about your surroundings?",
  "Think of a past challenge that made you stronger. How did you grow?",
];

function SelfCare() {
  const [score, setScore] = useState(0);
  const [gratitudePrompt, setGratitudePrompt] = useState(
    'Click below to get a gratitude challenge!'
  );
  const [gratitudeResponse, setGratitudeResponse] = useState('');
  const navigate = useNavigate();

  const handlePlayGame = () => {
    setScore(score + Math.floor(Math.random() * 10) + 1);
  };

  const generateGratitudePrompt = () => {
    const randomIndex = Math.floor(Math.random() * gratitudePrompts.length);
    setGratitudePrompt(gratitudePrompts[randomIndex]);
    setGratitudeResponse('');
  };

  return (
    <div className="self-care">
      <h2>Self-Care & Relationship</h2>

      <div className="minigames">
        <h3>Try These Stress-Relief Mini-Games</h3>
        <button onClick={() => navigate('/breakout')}>
          Atari Breakout
        </button>
        <button onClick={() => navigate('/memory-match')}>
          Memory Match
        </button>
      </div>

      <div className="self-care-tips">
        <h3>Self-Care Tips</h3>
        <ul>
          <li>Take regular breaks and practice deep breathing.</li>
          <li>Connect with loved ones and build supportive relationships.</li>
          <li>Engage in physical activities like yoga or walking.</li>
        </ul>
      </div>

      {/* Gratitude Challenge Mini-Game */}
      <div className="gratitude-game">
        <h3>Gratitude Challenge</h3>
        <p>{gratitudePrompt}</p>
        <button onClick={generateGratitudePrompt}>
          Get a Gratitude Challenge
        </button>
        <textarea
          value={gratitudeResponse}
          onChange={(e) => setGratitudeResponse(e.target.value)}
          placeholder="Write your gratitude response here..."
          className="gratitude-textbox"
        />
        <button
          onClick={() => alert(`Submitted: ${gratitudeResponse}`)}
          className="gratitude-submit"
        >
          Submit
        </button>
      </div>

      {/* Articles Section */}
      <div className="articles-section">
        <h2>Helpful Articles for Mental Well-Being</h2>
        <div className="articles-container">
          {articles.map((article, index) => (
            <div key={index} className="article-card">
              <h3>{article.title}</h3>
              <h5>{article.author}</h5>
              <p>{article.summary}</p>
              <a
                href={article.link}
                target="_blank"
                rel="noopener noreferrer"
                className="read-more"
              >
                Read More
              </a>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default SelfCare;
