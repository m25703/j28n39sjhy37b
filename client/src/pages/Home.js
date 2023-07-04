import React, { useContext } from "react";
import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { AuthContext } from "../helpers/AuthContext";
import Caroussel from "../components/Caroussel";

function Home() {
  const [listOfPosts, setListOfPosts] = useState([]);
  const { authState } = useContext(AuthContext);
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
        });
    }
  }, []);

  
  return (
    <div>
      {/* {listOfPosts.map((value, key) => {
        return (
          <div key={key} className="post">
            <div className="question"> {value.question} </div>
            <div
              className="body"
              onClick={() => {
                history.push(`/post/${value.id}`);
              }}
            >
              {value.answer}
            </div>
            <div className="footer">
              <div className="username">
                <Link to={`/profile/${value.UserId}`}> {value.username} </Link>
              </div>
            </div>
          </div>
        );
      })} */}
      <center>
      <div style={{align: 'center', alignItems: 'center', width:'68vw'}}>
        <Caroussel />
      </div>
    </center>
    </div>
  );
}

export default Home;