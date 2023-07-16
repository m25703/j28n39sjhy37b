import React, { useState, useRef, useEffect, useContext } from 'react';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import Card from './Card';
import axios from 'axios';
import { AuthContext } from '../helpers/AuthContext';
import { useHistory } from 'react-router-dom';
import config from '../config.json'

const Caroussel = () => {
  const [array, setArray] = useState([]);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const carouselRef = useRef(null);
  const [listPriority, setListPriority] = useState([]);
  const [list2, setList2] = useState([]);
  const [listOfPosts, setListOfPosts] = useState([]);
  const { authState } = useContext(AuthContext);
  const history = useHistory();

  useEffect(() => {
    if (!localStorage.getItem('accessToken')) {
      history.push('/login');
    } else {
      const fetchPosts = async () => {
        try {
          const response = await axios.get('http://localhost:3001/posts', {
            headers: { accessToken: localStorage.getItem('accessToken') },
          });
          setListOfPosts(response.data.listOfPosts);
        } catch (error) {
          console.error('Error fetching posts:', error);
        }
      };

      fetchPosts();
    }
  }, [history]);

  useEffect(() => {
    const interval = setInterval(() => {
      const fetchData = async () => {
        try {
          const response = await axios.get('http://localhost:3001/posts');
          setList2(response.data);

          const currentDate = new Date().toISOString();
          const updatedListPriority = [];
          for (let i = 0; i < response.data.length; i++) {
            console.log(response.data.length);
            const tempDate = new Date(Date.parse(response.data[i].createdAt));
            tempDate.setMinutes(tempDate.getMinutes() + response.data[i].lastlikeIncrement);
            const futureDate = tempDate.toISOString();
            if (futureDate > currentDate) {
              // console.log("DND The future date is later than the current time.");
            } else {
              updatedListPriority.push(response.data[i]);
              // console.log("DISPLAY --- The future date is earlier than the current time.");
            }
          }
          setListPriority(updatedListPriority);
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      };

      fetchData();
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const shuffledItems = [...listOfPosts].sort(() => Math.random() - 0.5);
        const pickedItems = shuffledItems.slice(0, config.deckSize);
        setArray(pickedItems);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const handleAddAfterCurrent1 = () => {
    if(array.length<1) return;
    const currentIndx = carouselRef.current.state.selectedItem;
    let currentData = array[currentIndx];
    const newLastlikeIncrement = currentData.lastlikeIncrement*2.5*1.5;
    const dloc = "http://localhost:3001/posts/" + currentData.id;
    axios.post("http://localhost:3001/posts", {
      answer:currentData.answer,
      lastlikeIncrement:newLastlikeIncrement,
      question:currentData.question,
      username:authState.username
    })
    .then(function (response) {
      console.log(response);
    })
    .catch(function (error) {
      console.log(error);
    });
    axios
      .delete(dloc) 
      .then(() => {
        console.log('Row deleted successfully');
      })
      .catch((error) => {
        console.error('Error deleting row:', error);
      });
    const currentIndex = selectedIndex;
    setSelectedIndex(currentIndex+1);
    const updatedArray = array.filter((card, index) => index !== currentIndx);
    setArray(updatedArray);
  };

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
    </div>
  </>
  );
};

export default Caroussel;