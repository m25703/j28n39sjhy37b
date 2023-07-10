import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { Link, useHistory } from "react-router-dom";

function Home() {
  const [listOfPosts, setListOfPosts] = useState([]);
  const [currentPostIndex, setCurrentPostIndex] = useState(0);
  const [lastClick, setLastClick] = useState(new Date()); // New state to keep track of the last click time
  let history = useHistory();

  // ...

  const goToNextPost = () => {
    const newIndex = currentPostIndex + 1;
    if (newIndex >= listOfPosts.length) {
      // Reached the end of the list, go back to the beginning
      setCurrentPostIndex(0);
    } else {
      setCurrentPostIndex(newIndex);
    }
    setLastClick(new Date()); // Update the last click time to the current time
  };

  useEffect(() => {
    if (listOfPosts.length > 0) {
      // Sort the posts based on the last clicked time (oldest first)
      const sortedPosts = [...listOfPosts].sort(
        (a, b) => new Date(a.lastClicked) - new Date(b.lastClicked)
      );
      setListOfPosts(sortedPosts);
    }
  }, [listOfPosts]);

  useEffect(() => {
    if (!localStorage.getItem("accessToken")) {
      history.push("/login");
    } else {
      axios
        .get("http://localhost:3001/posts", {
          headers: { accessToken: localStorage.getItem("accessToken") },
        })
        .then((response) => {
          const updatedPosts = response.data.listOfPosts.map((post) => ({
            ...post,
            lastClicked: lastClick, // Add a new property to store the last clicked time
          }));
          setListOfPosts(updatedPosts);
        });
    }
  }, [lastClick]);

  // ...

  return (
    <div>
      {listOfPosts.length > 0 && (
        <div className="post">
          <div className="question">{listOfPosts[currentPostIndex].question}</div>
          <div
            className="body"
            onClick={() => {
              history.push(`/post/${listOfPosts[currentPostIndex].id}`);
            }}
          >
            {listOfPosts[currentPostIndex].answer}
          </div>
          <div className="footer">
            <div className="username">
              <Link to={`/profile/${listOfPosts[currentPostIndex].UserId}`}>
                {listOfPosts[currentPostIndex].username}
              </Link>
            </div>
          </div>
        </div>
      )}
      <button onClick={goToNextPost}>Next Post</button>
    </div>
  );
}

export default Home;
