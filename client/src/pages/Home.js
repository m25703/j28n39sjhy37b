import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { Link, useHistory } from "react-router-dom";

function Home() {
  const [listOfPosts, setListOfPosts] = useState([]);
  const [currentPostIndex, setCurrentPostIndex] = useState(0);
  let history = useHistory();

  const [authState, setAuthState] = useState({
    username: "",
    id: 0,
    status: false,
  });

  useEffect(() => {
    axios
      .get("http://localhost:3001/auth/auth", {
        headers: {
          accessToken: localStorage.getItem("accessToken"),
        },
      })
      .then((response) => {
        if (response.data.error) {
          setAuthState({ ...authState, status: false });
        } else {
          setAuthState({
            username: response.data.username,
            id: response.data.id,
            status: true,
          });
        }
      });
  }, []);

  const logout = () => {
    localStorage.removeItem("accessToken");
    setAuthState({ username: "", id: 0, status: false });
    history.push("/login");
  };

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

  const goToNextPost = () => {
    const currentPost = listOfPosts[currentPostIndex];

    const newLastIncrement = currentPost.lastIncrement;
    const dloc = `http://localhost:3001/posts/${currentPost.id}`;

    // Delete the current post
    axios
      .delete(dloc)
      .then(() => {
        console.log("Row deleted successfully");
      })
      .catch((error) => {
        console.error("Error deleting row:", error);
      });

    // Create a new post with the same data as the current post
    axios
      .post("http://localhost:3001/posts", {
        answer: currentPost.answer,
        lastIncrement: newLastIncrement,
        question: currentPost.question,
        username: authState.username,
      })
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        console.log("Error creating new post:", error);
      });

    

    // Sort the posts based on lastClick in ascending order
    const sortedPosts = [...listOfPosts].sort(
      (a, b) =>
        new Date(a.lastClick).getTime() +
        a.lastIncrement * 60000 -
        (new Date(b.lastClick).getTime() + b.lastIncrement * 60000)
    );

    // Find the index of the current post in the sorted list
    const currentIndexInSorted = sortedPosts.findIndex(
      (post) => post.id === currentPost.id
    );

    // Choose the next post based on the sorted list
    let nextPostIndex;
    if (currentIndexInSorted === sortedPosts.length - 1) {
      // Reached the end of the list, go back to the beginning
      nextPostIndex = 0;
    } else {
      nextPostIndex = currentIndexInSorted + 1;
    }

    // Find the index of the next post in the original list
    const nextPostIndexInOriginal = listOfPosts.findIndex(
      (post) => post.id === sortedPosts[nextPostIndex].id
    );
    setCurrentPostIndex(nextPostIndexInOriginal);
  };

  return (
    <div>
      {listOfPosts.length > 0 && (
        <div className="post">
          <div className="question">
            {listOfPosts[currentPostIndex].question}
          </div>
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
              <Link
                to={`/profile/${listOfPosts[currentPostIndex].UserId}`}
              >
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
