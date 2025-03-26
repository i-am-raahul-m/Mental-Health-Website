import React, { useState } from "react";
import './Forum.css'

function Forum() {
  const [posts, setPosts] = useState([
    { 
      name: "Alex", 
      text: "Taking a short walk outside can do wonders for clearing your mind and reducing stress.", 
      comments: [
        "Jordan: Absolutely! Fresh air really helps me too.",
        "Taylor: I pair my walks with a calming playlist. Works every time!"
      ], 
      upvotes: 12,
      liked: false
    },
    { 
      name: "Jordan", 
      text: "Practicing mindfulness meditation for just 5 minutes a day can improve mental clarity and emotional balance.", 
      comments: [
        "Alex: Meditation has been a game changer for me.",
        "Taylor: It’s amazing how even a few minutes can make a big difference.",
        "Casey: I use a guided meditation app — super helpful!"
      ], 
      upvotes: 8,
      liked: false
    },
    { 
      name: "Taylor", 
      text: "Journaling your thoughts at the end of the day helps process emotions and promotes better sleep.", 
      comments: [
        "Jordan: I’ve started doing this recently and I sleep so much better now.",
        "Alex: It also helps me track my personal growth.",
        "Casey: Writing things down is so cathartic."
      ], 
      upvotes: 6,
      liked: false
    },
  ]);

  const [newPost, setNewPost] = useState("");
  const [replyingTo, setReplyingTo] = useState(null);

  const handlePostSubmit = (e) => {
    e.preventDefault();
    if (!newPost.trim()) return;
    setPosts([{ name: "User 1", text: newPost, comments: [], upvotes: 0, liked: false }, ...posts]);
    setNewPost("");
  };

  const addComment = (index, comment) => {
    if (!comment.trim()) return;
    const updatedPosts = [...posts];
    updatedPosts[index].comments.push(`User 1: ${comment}`);
    setPosts(updatedPosts);
  };

  const toggleUpvote = (index) => {
    const updatedPosts = [...posts];
    if (updatedPosts[index].liked) {
      updatedPosts[index].upvotes -= 1;
    } else {
      updatedPosts[index].upvotes += 1;
    }
    updatedPosts[index].liked = !updatedPosts[index].liked;
    setPosts(updatedPosts);
  };

  return (
    <div className="forum-container">
      <h2>Community Discussions</h2>

      {/* Post Form */}
      <div className="post-form">
        <textarea
          className="post-input"
          placeholder="Share your thoughts..."
          value={newPost}
          onChange={(e) => setNewPost(e.target.value)}
        />
        <button type="submit" className="post-button" onClick={handlePostSubmit}>
          Post
        </button>
      </div>

      {/* Discussion Feed */}
      <div className="feed">
        {posts.map((post, index) => (
          <div key={index} className="post-card">
            <p className="post-author">{post.name}</p>
            <p className="post-text">{post.text}</p>

            {/* Upvote Button */}
            <div className="upvote-container">
              <button className="upvote-button" onClick={() => toggleUpvote(index)}>
                {post.liked ? "👎" : "👍"} {post.upvotes}
              </button>
            </div>

            {/* Reply Button */}
            <button
              className="reply-button"
              onClick={() => setReplyingTo(replyingTo === index ? null : index)}
            >
              {replyingTo === index ? "Hide Replies" : "Show Replies"}
            </button>

            {/* Comments Section */}
            <div className={`comment-section ${replyingTo === index ? "open" : ""}`}>
              {post.comments.map((comment, cIndex) => (
                <div key={cIndex} className="comment">
                  {comment}
                </div>
              ))}
              {replyingTo === index && (
                <input
                  type="text"
                  className="comment-input"
                  placeholder="Write a reply..."
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      addComment(index, e.target.value);
                      e.target.value = "";
                    }
                  }}
                />
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Forum;
