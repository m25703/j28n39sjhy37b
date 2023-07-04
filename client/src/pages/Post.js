import React, { useEffect, useState, useContext } from "react";
import { useParams, useHistory } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../helpers/AuthContext";

function Post() {
  let { id } = useParams();
  const [postObject, setPostObject] = useState({});
  const { authState } = useContext(AuthContext);

  let history = useHistory();

  useEffect(() => {
    axios.get(`http://localhost:3001/posts/byId/${id}`).then((response) => {
      setPostObject(response.data);
    });
  }, []);

  const deletePost = (id) => {
    axios
      .delete(`http://localhost:3001/posts/${id}`, {
        headers: { accessToken: localStorage.getItem("accessToken") },
      })
      .then(() => {
        history.push("/");
      });
  };

  const editPost = (option) => {
    if (option === "question") {
      let newQuestion = prompt("Enter New Question:");
      axios.put(
        "http://localhost:3001/posts/question",
        {
          newQuestion: newQuestion,
          id: id,
        },
        {
          headers: { accessToken: localStorage.getItem("accessToken") },
        }
      );

      setPostObject({ ...postObject, question: newQuestion });
    } else {
      let newanswer = prompt("Enter New Text:");
      axios.put(
        "http://localhost:3001/posts/answer",
        {
          newText: newanswer,
          id: id,
        },
        {
          headers: { accessToken: localStorage.getItem("accessToken") },
        }
      );

      setPostObject({ ...postObject, answer: newanswer });
    }
  };

  return (
    <div className="postPage">
      <div className="leftSide">
        <div className="post" id="individual">
          <div
            className="question"
            // onClick={() => {
            //   if (authState.username === postObject.username) {
            //     editPost("title");
            //   }
            // }}
          >
            {postObject.question}
          </div>
          <div
            className="body"
            // onClick={() => {
            //   if (authState.username === postObject.username) {
            //     editPost("body");
            //   }
            // }}
          >
            {postObject.answer}
          </div>
          <div className="footer">
            {postObject.username}
            {authState.username === postObject.username && (
              <button
                onClick={() => {
                  deletePost(postObject.id);
                }}
              >
                {" "}
                Delete Post
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Post;
