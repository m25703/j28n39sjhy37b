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
          console.log(authState);
        }
      });
  }, []);

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

  const addLike = (postId) => {
    // Retrieve the current likeIncrement value
    axios
      .get(`http://localhost:3001/likes/${postId}`, {
        headers: { accessToken: localStorage.getItem("accessToken") },
      })
      .then((response) => {
        const currentlikeIncrement = response.data.likeIncrement; // Access `likeIncrement` from `response.data`
        console.log(currentlikeIncrement);
        const newlikeIncrement = currentlikeIncrement + 3;
        console.log(newlikeIncrement);
        // Update the likeIncrement value with the new value
        console.log(postId);
        axios
          .post(
            "http://localhost:3001/likes",
            {
              PostId: postId,
              customNumber: newlikeIncrement,
            },
            {
              headers: { accessToken: localStorage.getItem("accessToken") },
            }
          )
          .then((response) => {
            console.log("Added like:", response.data);
            // Handle the response accordingly, e.g., update the UI
          })
          .catch((error) => {
            console.error("Error adding like:", error);
          });
      })
      .catch((error) => {
        console.error("Error retrieving likeIncrement:", error);
      });
  };
  
  
  
  

  const goToNextPost = () => {
    const currentPost = listOfPosts[currentPostIndex];
    addLike(currentPost.id);
    // Sort the posts based on lastClick in ascending order
    const sortedPosts = [...listOfPosts].sort(
      (a, b) => a.id - b.id
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
            <h4>{listOfPosts[currentPostIndex].question}</h4>
          </div>
          <div className="body" >
            {listOfPosts[currentPostIndex].answer}
          </div>
          <div className="footer">
            {/*put buttons here*/}
          </div>
        </div>
      )}
      <button onClick={goToNextPost}>Next Post</button>
    </div>
  );
}

export default Home;
