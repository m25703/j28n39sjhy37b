import React, { useState, useRef, useEffect } from 'react';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import Card from './Card';
import config from "../config.json"

import axios from "axios";

// {
//   answer:"aaa",
//   createdAt:"2023-06-24T18:02:37.000Z",
//   id:2,
//   lastClick:"1970-01-01T00:00:00.000Z",
//   lastIncrement:1,
//   question:"t2",
//   updatedAt:"2023-06-24T18:02:37.000Z",
//   username:"abcd",
// }

const Caroussel = ({ flashcards }) => {
  const [array, setArray] = useState([]);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const carouselRef = useRef(null);
  const [listPriority, setListPriority] = useState([]);
  const [list2, setList2] = useState([]);

  // useEffect(() => {
  //   axios.get("http://localhost:3001/posts").then((response) => {
  //     // for(let i =0; i<listOfposts.length; i++) { console.log(listOfposts[i]); }
  //     setListOfposts(response.data);
  //   });
  // }, []);

  useEffect(() => {
    const shuffledItems = [...flashcards].sort(() => Math.random() - 0.5);
    const pickedItems = shuffledItems.slice(0, config.deckSize);
    setArray(pickedItems);
  }, [flashcards]);

  // useEffect(() => {
  //   const interval = setInterval(() => {
  //     setArray(prevArray => [...prevArray, ...difficultCards]);
  //     setDifficultCards([]);
  //   }, 6000);
  //   return () => clearInterval(interval);
  // }, [difficultCards]);

  // useEffect(() => {
  //   const interval = setInterval(() => {
  //     setArray(prevArray => [...prevArray, ...normalCards]);
  //     setNormalCards([]);
  //   }, 15000);
  //   return () => clearInterval(interval);
  // }, [normalCards]);

  useEffect(() => {
    const interval = setInterval(() => {
      axios.get("http://localhost:3001/posts").then((response) => {
      // for(let i =0; i<listOfposts.length; i++) { console.log(listOfposts[i]); }
      setList2(response.data);
      });
      var currentDate = new Date().toISOString();
      for(let i =0; i<list2.length; i++) {
        var tempDate = new Date(Date.parse(list2[i].createdAt));
        tempDate.setMinutes(tempDate.getMinutes() + list2[i].lastIncrement);
        var futureDate = tempDate.toISOString();
        if (futureDate > currentDate) {
          console.log("DND The future date is later than the current time.");
        } else {
          listPriority.push(list2[i]);
          console.log("DISPLAY --- The future date is earlier than the current time.");
        }
      }
      console.log(listPriority.length);
      for (let i = 0; i < listPriority.length; i++) {
        console.log(listPriority[i]);
        if (!array.some((item) => item.id === listPriority[i].id)) {
          setArray((prevArray) => [...prevArray, listPriority[i]]);
        }
      }
      setListPriority([]);
    }, 6000);
    return () => clearInterval(interval);
  }, [list2]);

 

  const handleAddAfterCurrent1 = () => {
    const currentIndx = carouselRef.current.state.selectedItem;
    let currentData = array[currentIndx];
    // console.log(currentData);
    // const dLink = 'https://localhost:3001/posts/' + currentData.id;
    // axios.delete('http://localhost:3001/posts/${currentData}')
    // .then(() => console.log('Delete successful'));

    const newLastIncrement = currentData.lastIncrement+3;
    const dloc = "http://localhost:3001/posts/" + currentData.id;
    axios.post("http://localhost:3001/posts", {
      answer:currentData.answer,
      lastIncrement:newLastIncrement,
      question:currentData.question,
      username:currentData.username
    })
    .then(function (response) {
      console.log(response);
    })
    .catch(function (error) {
      console.log(error);
    });

    // const id = 5; // Replace with the desired primary key ID to delete

    axios
      .delete(dloc)
      .then(() => {
        console.log('Row deleted successfully');
        // Perform any additional actions or update the UI as needed
      })
      .catch((error) => {
        console.error('Error deleting row:', error);
        // Handle error scenarios and display an error message if needed
      });
    const currentIndex = selectedIndex;
    setSelectedIndex(currentIndex+1);
    const updatedArray = array.filter((card, index) => index !== currentIndx);
    setArray(updatedArray);
  };

  // const handleAddAfterCurrent2 = () => {
  //   const currentIndx = carouselRef.current.state.selectedItem;
  //   const currentData = array[currentIndx];
  //   const currentIndex = selectedIndex;
  //   let newArray = [...array];
  //   setNewNormalCards([]);
  //   if(!normalCards.includes(currentData)) {
  //     setNewNormalCards(currentData);
  //   }
  //   if(newNormalCards.length!==0) {
  //   setNormalCards([...normalCards,newNormalCards]);
  //   }
  //   // console.log(normalCards);
  //   if (newArray.length < config.deckSize) {
  //     const remainingFlashcards = flashcards.filter(
  //       card => !newArray.includes(card)
  //     );
  //     const shuffledRemaining = remainingFlashcards.sort(() => Math.random() - 0.5);
  //     const newCards = shuffledRemaining.slice(0, config.deckSize);
  //     newArray = [...newArray, ...newCards];
  //     setArray(newArray);
  //   }

  //   setSelectedIndex(currentIndex+1);
  //   setTimeout(() => {
  //     const newCurrentIndex = carouselRef.current.state.selectedItem;
  //     newArray.splice(newCurrentIndex +1 , 0, currentData);
  //     setArray(newArray);
  //   }, 5000);
  // };
  
  // const handleAddAfterCurrent3 = () => {
  //   const currentIndx = carouselRef.current.state.selectedItem;
  //   const currentData = array[currentIndx];
  //   const currentIndex = selectedIndex;
  //   let newArray = [...array];
  //   setNewDifficultCards([]);
  //   if(!difficultCards.includes(currentData)) {
  //     setNewDifficultCards(currentData);
  //   }
  //   if(newDifficultCards.length!==0) {
  //     setDifficultCards([...difficultCards, newDifficultCards]);
  //   }
  //   // console.log(difficultCards);
  //   if (newArray.length < config.deckSize) {
  //     const remainingFlashcards = flashcards.filter(
  //       card => !newArray.includes(card)
  //     );
  //     const shuffledRemaining = remainingFlashcards.sort(() => Math.random() - 0.5);
  //     const newCards = shuffledRemaining.slice(0, config.deckSize);
  //     newArray = [...newArray, ...newCards];
  //     setArray(newArray);
  //   }
  //   setSelectedIndex(currentIndex+1);
  //   setTimeout(() => {
  //     const newCurrentIndex = carouselRef.current.state.selectedItem;
  //     newArray.splice(newCurrentIndex +1 , 0, currentData);
  //     setArray(newArray);
  //   }, 5000);
  // };

  return (
    <>
      <div style={{margin: '0', align: 'center',
                justifyContent: 'center',
                alignItems: 'center', maxwidth:'74vw'}}>
        <Carousel
          ref={carouselRef}
          selectedItem={selectedIndex}
          onChange={index => setSelectedIndex(index)}
          showArrows={true}
          infiniteLoop={true}
          showThumbs={false}
          showIndicators={false}
        >
          {array.map((flashcard, index) => (
            <div
              key={index}
              className="card"
              style={{
                width:'72vw',
                height: '26vw',
                backgroundColor: 'deepskyblue',
              }}>
              <Card question={flashcard.question} answer={flashcard.answer} />
            </div>
          ))}
        </Carousel>
      </div>
      <div align='center'>
      <button onClick={handleAddAfterCurrent1} style={{
          backgroundColor:'#62ddbd',
          borderRadius:'0.33vw',
          borderStyle:'none',
          boxSizing:'border-box',
          color:'#fff',
          cursor:'pointer',
          display:'inline-block',
          fontfamily:'"Farfetch Basis","Helvetica Neue",Arial,sans-serif',
          fontSize:'2vw',
          fontWeight:'400',
          margin:'1vw',
          minHeight:'3.66vw',
          minWidth:'0.86vw',
          outline:'none',
          overflow:'hidden',
          padding:'0.75vw 1.66vw 0.66vw',
          position:'relative',
          textAlign:'center',
          textTransform:'none',
          touchAction:'manipulation'
      }}>Easy</button> 
      {/* <button onClick={handleAddAfterCurrent2}
      style={{
        backgroundColor:'#a2aeb3',
        borderRadius:'0.33vw',
        borderStyle:'none',
        boxSizing:'border-box',
        color:'#fff',
        cursor:'pointer',
        display:'inline-block',
        fontfamily:'"Farfetch Basis","Helvetica Neue",Arial,sans-serif',
        fontSize:'2vw',
        fontWeight:'400',
        margin:'1vw',
        minHeight:'3.66vw',
        minWidth:'0.86vw',
        outline:'none',
        overflow:'hidden',
        padding:'0.75vw 1.66vw 0.66vw',
        position:'relative',
        textAlign:'center',
        textTransform:'none',
        touchAction:'manipulation'
      }}>Needs Practice</button> 
      <button onClick={handleAddAfterCurrent3}
      style={{
        backgroundColor:'#ff7373',
        borderRadius:'0.33vw',
        borderStyle:'none',
        boxSizing:'border-box',
        color:'#fff',
        cursor:'pointer',
        display:'inline-block',
        fontfamily:'"Farfetch Basis","Helvetica Neue",Arial,sans-serif',
        fontSize:'2vw',
        fontWeight:'400',
        margin:'1vw',
        minHeight:'3.66vw',
        minWidth:'0.86vw',
        outline:'none',
        overflow:'hidden',
        padding:'0.75vw 1.66vw 0.66vw',
        position:'relative',
        textAlign:'center',
        textTransform:'none',
        touchAction:'manipulation'
      }}>Difficult</button> */}
    </div>
  </>
  );
};

export default Caroussel;
