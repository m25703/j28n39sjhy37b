import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import './AutoCreate.css'
import { AuthContext } from "../helpers/AuthContext";

export default function Creation() {
  const [prompt, setPrompt] = useState("");
  const [response, setResponse] = useState("");
  const HTTP = "http://localhost:8080/chat";
  const { authState } = useContext(AuthContext);

  const handleSubmit = (e) => {
    e.preventDefault();

    const modifiedPrompt = `FOR THE FOLLOWING TEXT, GENERATE A ARRAY OF JSON OBJECTS, EACH WITH AN ATTRIBUTE "question" and "answer", return it as plain text and do not include any other text: ${prompt}`;
    setPrompt(modifiedPrompt);

    axios
      .post(`${HTTP}`, { prompt })
      .then((res) => {
        setResponse(res);
        console.log(res);
      })
      .catch((error) => {
        console.log(error);
      });

    setPrompt("");
  };

  const handlePrompt = (e) => {
    setPrompt(e.target.value);
  };

  useEffect(() => {
    if (!localStorage.getItem("accessToken")) {
      console.log("failed");
    } else {
      for(let k =0; k<response.length; k+=1) {
        axios
        .post("http://localhost:3001/posts", response[k], {
          headers: { accessToken: localStorage.getItem("accessToken") },
        })
      }
    }
  }, [response]);

  return (
    <div className="container container-sm p-1">
      <form className="form" onSubmit={handleSubmit}>
        <div className="form-group">
          <a href="">Link</a>
          <h2>AutoCreate Cards</h2>
          <label htmlFor="">Add your text here: </label>
          <input
            className="shadow-sm"
            type="text"
            placeholder="Enter text"
            value={prompt}
            onChange={handlePrompt}
            style={{width:"75vw", height:"75vh"}}
          />
        </div>
      </form>
    </div>
  );
}