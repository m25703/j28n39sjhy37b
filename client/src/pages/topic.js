import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import axios from "axios";
import "./Tp.css"; // Import CSS file for component-specific styles

const Tp = ({ }) => {
  const [listOfPosts, setListOfPosts] = useState([]);
  const [selectedTopic, setSelectedTopic] = useState(null);
  const [showTopics, setShowTopics] = useState(true); // Add state for showing/hiding topics
  let history = useHistory();

  useEffect(() => {
    if (!localStorage.getItem("accessToken")) {
      history.push("/login");
    } else {
      axios
        .get("http://localhost:3001/posts", {
          headers: { accessToken: localStorage.getItem("accessToken") },
        })
        .then((response) => {
          setListOfPosts(response.data.listOfPosts);
        })
        .catch((error) => {
          console.error("Error fetching posts:", error);
        });
    }
  }, []);

  const handleTopicClick = (topic) => {
    setSelectedTopic(topic);
    setShowTopics(false); // Hide topics when a topic is clicked
  };

  // Extract unique topics from listOfPosts
  const topics = Array.from(new Set(listOfPosts.map((post) => post.topic)));

  // Filter posts based on selected topic
  const filteredPosts = selectedTopic
    ? listOfPosts.filter((post) => post.topic === selectedTopic)
    : listOfPosts;

  return (
    <div className="tp-container" style={{width:"100%", height:"100%", margin:"0vw", padding:"5vw"}}>
      <style>{'body { background:linear-gradient(90deg, #ff9966, #ff5e62); }'}</style>
      {showTopics && (
        <div className="topics-container">
          <h2>Topics</h2>
          <ul>
            {topics.map((topic) => (
              <li key={topic}>
                <button onClick={() => handleTopicClick(topic)}>{topic}</button>
              </li>
            ))}
          </ul>
        </div>
      )}

      {!showTopics && (
        <div className="posts-container">
          <button onClick={() => setShowTopics(true)}  style={{
              appearance: 'none',
              backgroundColor: '#0a0a0a',
              borderRadius: '2vw',
              borderStyle: 'none',
              color: '#FFFFFF',
              cursor: 'pointer',
              fontFamily:
                'Roobert,-apple-system,BlinkMacSystemFont,"Segoe UI",Helvetica,Arial,sans-serif,"Apple Color Emoji","Segoe UI Emoji","Segoe UI Symbol"',
              fontSize: '2vw',
              lineHeight: 'normal',
              padding:'0.75vw 1.66vw 0.66vw',
              minWidth: '0',
              outline: 'none',
              textAlign: 'center',
              textDecoration: 'none',
              transition: 'all 300ms cubic-bezier(.23, 1, 0.32, 1)',
              userSelect: 'none',
              touchAction: 'manipulation',
              width: '16vw',
              margin:'0.75vw',
              willChange: 'transform'
            }} >Back to Topics</button>
          <h2>Cards</h2>
          <ul>
            {filteredPosts.map((post) => (
              <li key={post.id}>
                <div className="post-container">
                  <p className="post-question">Question: {post.question}</p>
                  <p className="post-answer">Answer: {post.answer}</p>
                  <p className="post-topic">Topic: {post.topic}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Tp;
