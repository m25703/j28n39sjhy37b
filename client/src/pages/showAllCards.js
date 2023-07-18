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
    <div className="tp-container">
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
          <button onClick={() => setShowTopics(true)}>Back to Topics</button>
          <h2>Posts</h2>
          <ul>
            {filteredPosts.map((post) => (
              <li key={post.id}>
                <p>Question: {post.question}</p>
                <p>Answer: {post.answer}</p>
                <p>Username: {post.username}</p>
                <p>Topic: {post.topic}</p>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Tp;
