import React from "react";
import axios from "axios";
import { useEffect, useState } from "react";
import Caroussel from "../cpy/Caroussel";

function Home() {
  const [listOfposts, setListOfposts] = useState([]);
  useEffect(() => {
    axios.get("http://localhost:3001/posts").then((response) => {
      // for(let i =0; i<listOfposts.length; i++) { console.log(listOfposts[i]); }
      setListOfposts(response.data);
    });
  }, []);

  return (
    <center>
      <div style={{align: 'center', alignItems: 'center', width:'68vw'}}>
        <Caroussel flashcards={listOfposts}/>
      </div>
    </center>
  );
}

export default Home;
