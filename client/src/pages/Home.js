import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { Link, useHistory } from "react-router-dom";
import Card from "./Card"

// `Home` component details:

// 1. **State Initialization:**
//    - The component initializes several state variables using the `useState` hook:
//      - `listOfPosts`: An array that holds the list of posts fetched from the server.
//      - `interactdPosts`: An array that may hold posts with interactions based on the user's interactions with the posts.
//      - `currentPostIndex`: An index that represents the current post being displayed in the card.
//      - `currentPost`: An object representing the post currently being displayed in the card.
//      - `authState`: An object representing the user's authentication status, including `username`, `id`, and `status`.

// 2. **User Authentication Check:**
//    - The component uses the `useEffect` hook with an empty dependency array to run once when the component mounts.
//    - Inside this effect, it sends a GET request to the server's `/auth/auth` endpoint to check the user's authentication status.
//    - If the response contains an error, it sets the `status` property of `authState` to `false`, indicating that the user is not authenticated.
//    - If the response is successful, it sets the `username`, `id`, and `status` properties of `authState` based on the data received from the server.

// 3. **Fetching Posts and Filtering Interactions:**
//    - The component uses another `useEffect` hook to fetch the list of posts from the server.
//    - It sends a GET request to the `/posts` endpoint with the access token in the headers to authenticate the request.
//    - Upon successful response, it sets the `listOfPosts` state with the received data.
//    - It also filters the posts to create `interactdPosts`, which only contains posts with interactions associated with the authenticated user (filtered based on `authState.id`).

// 4. **Selecting Next Post:**
//    - The `selectNextPost` function is used to determine the next post to display in the card based on user interactions and timestamps.
//    - It filters the `interactdPosts` array to find posts with interactions. It then checks the timestamps of interactions to find the post with the most recent interaction.
//    - If a recent post with interactions is found, it sets `currentPost` to that post.
//    - If there are no posts with interactions or if the `currentPost` has not changed, it selects a random post from `listOfPosts` to display.

// 5. **Interacting with Posts:**
//    - The component contains three functions: `handleAddAfterCurrent1`, `handleAddAfterCurrent2`, and `handleAddAfterCurrent3`.
//    - These functions are called when the user clicks the "Easy," "Needs Practice," or "Difficult" buttons, respectively.
//    - Each function calls the corresponding `addinteractX` function, where `X` is the level of interaction.
//    - The `addinteractX` functions send a GET request to the server's `/interacts/:postId` endpoint to retrieve the current interaction increment for the given post.
//    - Based on the current increment, it calculates a new increment value and sends a POST request to the `/interacts` endpoint to update the interaction with the new increment.

// 6. **Rendering the UI:**
//    - The component returns JSX to render the user interface.
//    - If `listOfPosts` is not empty and a `currentPost` is available, it renders a card component with the current post's question and answer.
//    - It also displays buttons for the user to interact with the post.
//    - If the user is not authenticated or there are no more posts to review, it displays a message indicating that the user is done reviewing.

function Home() {
  const [listOfPosts, setListOfPosts] = useState([]);
  const [interactdPosts, setinteractdPosts] = useState([]);
  const [currentPostIndex, setCurrentPostIndex] = useState(0);
  const [currentPost, setCurrentPost] = useState(null);
  let history = useHistory();

  const [authState, setAuthState] = useState({
    username: "",
    id: 2,
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
          // console.log(authState);
        }
      });
  }, []);

  // useEffect(() => {
  //   if(currentPostIndex < 0) {
  //     const randomIndex = Math.floor(Math.random() * listOfPosts.length);
  //     setCurrentPostIndex(randomIndex);
  //   }
  // }, [currentPostIndex]);


  // useEffect(() => {
  //   if (!localStorage.getItem("accessToken")) {
  //     console.log("failed");
  //   } else {
  //     axios
  //       .get("http://localhost:3001/posts",{
  //         headers: { accessToken: localStorage.getItem("accessToken") },
  //       })
  //       .then((response) => {
  //         console.log(authState.id);
  //         let tempList = response.data.listOfPosts;
  //         for(let k = 0; k<tempList.length; k+=1) {
  //           console.log(tempList[k]);
  //           for(let l = 0; l<tempList[k].interacts.length; l+=1) {
  //             if(tempList[k].interacts[l].UserId!=authState.id) {
  //               console.log(tempList[k].interacts[l].UserId);
  //               console.log(authState.id);
  //               tempList[k].interacts.splice(l, 1);
  //               console.log(tempList[k]);
  //               // tempList[k].interacts = tempList[k].interacts.filter((_, index) => index !== l);
  //             }
  //           }
  //         }
  //         for(let k = 0; k<tempList.length; k+=1) {
  //           console.log(tempList[k]);}
  //         setListOfPosts(tempList);
  //         // setinteractdPosts(response.data.interactdPosts);
  //       })
  //       .catch((error) => {
  //         console.error("Error fetching posts:", error);
  //       });
  //   }
  // }, []);

  useEffect(() => {
    if (!localStorage.getItem("accessToken")) {
      console.log("failed");
    } else {
      axios
        .get("http://localhost:3001/posts", {
          headers: { accessToken: localStorage.getItem("accessToken") },
        })
        .then((response) => {
          console.log(authState.id);
          let tempList = response.data.listOfPosts;
          tempList.forEach((post) => {
            post.interacts = post.interacts.filter((interact) => interact.UserId === authState.id);
          });
          // console.log(tempList);
          setListOfPosts(tempList);
          const randomIndex = Math.floor(Math.random() * tempList.length);
          // console.log("rr",randomIndex);
          setCurrentPost(tempList[randomIndex]);
        })
        .catch((error) => {
          console.error("Error fetching posts:", error);
        });
    }
  }, []);
  
  const setPosts = () => {
    if (!localStorage.getItem("accessToken")) {
      history.push("/login");
    } else {
      axios
        .get("http://localhost:3001/posts", {
          headers: { accessToken: localStorage.getItem("accessToken") },
        })
        .then((response) => {
          setListOfPosts(response.data.listOfPosts);
          // setinteractdPosts(response.data.interactdPosts);
        })
        .catch((error) => {
          console.error("Error fetching posts:", error);
        });
    }
  };

  const addinteract1 = (postId) => {
    axios
      .get(`http://localhost:3001/interacts/${postId}`, {
        headers: { accessToken: localStorage.getItem("accessToken") },
      })
      .then((response) => {
        const currentinteractIncrement = response.data.interactIncrement;
        // console.log(currentinteractIncrement);
        const newinteractIncrement = currentinteractIncrement*1.25*2.5;
        // console.log(newinteractIncrement, postId);
        axios
          .post(
            "http://localhost:3001/interacts",
            {
              PostId: postId,
              customNumber: newinteractIncrement,
            },
            {
              headers: { accessToken: localStorage.getItem("accessToken") },
            }
          )
          .then((response) => {
            console.log("Added interact:", response.data);
          })
          .catch((error) => {
            console.error("Error adding interact:", error);
          });
      })
      .catch((error) => {
        console.error("Error retrieving interactIncrement:", error);
      });
  };

  const addinteract2 = (postId) => {
    axios
      .get(`http://localhost:3001/interacts/${postId}`, {
        headers: { accessToken: localStorage.getItem("accessToken") },
      })
      .then((response) => {
        const currentinteractIncrement = response.data.interactIncrement;
        // console.log(currentinteractIncrement);
        const newinteractIncrement = currentinteractIncrement*2.5;
        console.log(newinteractIncrement, postId);
        axios
          .post(
            "http://localhost:3001/interacts",
            {
              PostId: postId,
              customNumber: newinteractIncrement,
            },
            {
              headers: { accessToken: localStorage.getItem("accessToken") },
            }
          )
          .then((response) => {
            console.log("Added interact:", response.data);
          })
          .catch((error) => {
            console.error("Error adding interact:", error);
          });
      })
      .catch((error) => {
        console.error("Error retrieving interactIncrement:", error);
      });
  };

  const addinteract3 = (postId) => {
    axios
      .get(`http://localhost:3001/interacts/${postId}`, {
        headers: { accessToken: localStorage.getItem("accessToken") },
      })
      .then((response) => {
        const currentinteractIncrement = response.data.interactIncrement;
        // console.log(currentinteractIncrement);
        const newinteractIncrement = currentinteractIncrement*1.2;
        console.log(newinteractIncrement, postId);
        axios
          .post(
            "http://localhost:3001/interacts",
            {
              PostId: postId,
              customNumber: newinteractIncrement,
            },
            {
              headers: { accessToken: localStorage.getItem("accessToken") },
            }
          )
          .then((response) => {
            console.log("Added interact:", response.data);
          })
          .catch((error) => {
            console.error("Error adding interact:", error);
          });
      })
      .catch((error) => {
        console.error("Error retrieving interactIncrement:", error);
      });
  };

  // const selectNextPost = (currentPost) => {

  //   const withinteracts = listOfPosts.filter((post) => post.hasOwnProperty("interacts") && (post.interacts.length>0));
  //   const withoutinteracts = listOfPosts.filter((post) => (!post.hasOwnProperty("interacts")) || (post.interacts.length<1));
  //   for(let k = 0; k<withoutinteracts.length; k+=1) {
  //     console.log("not interactd:", withoutinteracts[k]);
  //   }
  //   for(let k = 0; k<withinteracts.length; k+=1) {
  //     console.log("interactd:", withinteracts[k]);
  //   }
  //   if (withinteracts.length > 0) {
  //     const currentTime = Date.now();
  //     // console.log(currentTime);
  //     const filteredPosts = withinteracts.filter((post) => {
  //         if( post.interacts.length<1 ) { return false; }
  //         const interactIncrement = post.interacts[0].interactIncrement;
  //         console.log("B ", Date.parse(post.updatedAt));
  //         console.log("B ", interactIncrement*1000);
  //         const updatedAtWithinteracts = Date.parse(post.updatedAt) + interactIncrement*1000;
  //         console.log("A ", updatedAtWithinteracts);
  //         console.log("A ", currentTime);
  //         return updatedAtWithinteracts > currentTime;
  //     });
  //     const sortedPosts = filteredPosts.sort((a, b) => {
  //       const interactIncrementA = Date.parse(a.updatedAt) + a.interacts[0].interactIncrement*1000;
  //       const interactIncrementB = Date.parse(b.updatedAt) + b.interacts[0].interactIncrement*1000;
  //       return interactIncrementB - interactIncrementA;
  //     });
  //     for(let k = 0; k<sortedPosts.length; k+=1) {
  //       console.log("sorted:", sortedPosts[k]);
  //     }
  //     // const highestinteractIncrementPost = sortedPosts[0];
  //     // const nextPostIndexInOriginal = listOfPosts.findIndex((post) => post.id === highestinteractIncrementPost.id);

  //     const highestinteractIncrementPost = sortedPosts.length > 0 ? sortedPosts[0] : null;
  //     console.log("hihhh", highestinteractIncrementPost);
  //     const nextPostIndexInOriginal = highestinteractIncrementPost
  //       ? listOfPosts.findIndex((post) => post.id === highestinteractIncrementPost.id)
  //       : -1;
  //     if(nextPostIndexInOriginal === -1 || highestinteractIncrementPost === null) {
  //       console.log("No review cards available, generating new card");
  //       if(withoutinteracts.length > 0) {
  //         console.log("a");
  //         const currentIndex = withoutinteracts.findIndex((post) => post.id === currentPost.id);
  //         let nextPostIndex;
  //         if (currentIndex === withoutinteracts.length - 1) {
  //           nextPostIndex = 0;
  //           console.log("b");
  //         } else {
  //           nextPostIndex = currentIndex + 1;
  //           console.log("c");
  //         }
  //         const nextPostIndexInOriginal = listOfPosts.findIndex((post) => post.id === withoutinteracts[nextPostIndex].id);
  //         setCurrentPostIndex(nextPostIndexInOriginal);
  //       } else {
  //         console.log("No cards available");
  //         console.log("d");
  //         setCurrentPostIndex((prevIndex) => {
  //           const nextPostIndex = prevIndex + 1;
  //           return nextPostIndex >= listOfPosts.length ? 0 : nextPostIndex;
  //         });
  //       }
  //     }
  //     const randomNumber = Math.random();
  //     if (randomNumber > 0.75 && withoutinteracts.length > 0) {
  //       const currentIndex = withoutinteracts.findIndex((post) => post.id === currentPost.id);
  //       let nextPostIndex;
  //       if (currentIndex === withoutinteracts.length - 1) {
  //         nextPostIndex = 0;
  //       } else {
  //         nextPostIndex = currentIndex + 1;
  //       }
  //       const nextPostIndexInOriginal = listOfPosts.findIndex((post) => post.id === withoutinteracts[nextPostIndex].id);
  //       setCurrentPostIndex(nextPostIndexInOriginal);
  //     } else {
  //       setCurrentPostIndex(nextPostIndexInOriginal);
  //     }
  //   }
  //   else if (withoutinteracts.length > 0) {
  //     const currentIndex = withoutinteracts.findIndex((post) => post.id === currentPost.id);
  //     let nextPostIndex;
  //     if (currentIndex === withoutinteracts.length - 1) {
  //       nextPostIndex = 0;
  //     } else {
  //       nextPostIndex = currentIndex + 1;
  //     }
  //     const nextPostIndexInOriginal = listOfPosts.findIndex((post) => post.id === withoutinteracts[nextPostIndex].id);
  //     setCurrentPostIndex(nextPostIndexInOriginal);
  //   }
  //   else {
  //     console.log("No cards available 2");
  //     setCurrentPostIndex((prevIndex) => {
  //       const nextPostIndex = prevIndex + 1;
  //       return nextPostIndex >= listOfPosts.length ? 0 : nextPostIndex;
  //     });
  //   }
  //   if(currentPostIndex < 0) {
  //     setCurrentPostIndex((prevIndex) => {
  //       const nextPostIndex = prevIndex + 1;
  //       return nextPostIndex >= listOfPosts.length ? 0 : nextPostIndex;
  //     });
  //   }
  // };

  useEffect(() => {
    if (!localStorage.getItem("accessToken")) {
      console.log("failed");
    } else {
      axios
        .get("http://localhost:3001/posts", {
          headers: { accessToken: localStorage.getItem("accessToken") },
        })
        .then((response) => {
          console.log(authState.id);
          let tempList = response.data.listOfPosts;
          tempList.forEach((post) => {
            post.interacts = post.interacts.filter((interact) => interact.UserId === authState.id);
          });
          console.log(tempList);
          setListOfPosts(tempList);
          // setinteractdPosts(response.data.interactdPosts);
        })
        .catch((error) => {
          console.error("Error fetching posts:", error);
        });
    }
  }, []);

  const selectNextPost = () => {
    const prev = currentPost;
    const withinteracts = listOfPosts.filter((post) => post.hasOwnProperty("interacts") && (post.interacts.length>0));
    const withoutinteracts = listOfPosts.filter((post) => (!post.hasOwnProperty("interacts")) || (post.interacts.length<1));
    for(let k = 0; k<withoutinteracts.length; k+=1) {
      console.log("not interactd:", withoutinteracts[k]);
    }
    for(let k = 0; k<withinteracts.length; k+=1) {
      console.log("interactd:", withinteracts[k]);
    }
    if (withinteracts.length > 0) {
      const currentTime = Date.now();
      console.log(currentTime);
      const filteredPosts = withinteracts.filter((post) => {
          if( post.interacts.length<1 ) { return false; }
          const interactIncrement = post.interacts[0].interactIncrement;
          const updatedAtWithinteracts = Date.parse(post.updatedAt) + interactIncrement*1000;
          console.log("A ", Date.parse(post.updatedAt), "+", interactIncrement*1000, updatedAtWithinteracts, currentTime, updatedAtWithinteracts < currentTime);
          return updatedAtWithinteracts < currentTime;
      });
      if(filteredPosts.length>0) {
        const sortedPosts = filteredPosts.sort((a, b) => {
          const interactIncrementA = Date.parse(a.updatedAt) + a.interacts[0].interactIncrement*1000;
          const interactIncrementB = Date.parse(b.updatedAt) + b.interacts[0].interactIncrement*1000;
          return interactIncrementB - interactIncrementA;
        });
          setCurrentPost(sortedPosts[0]);
          console.log(sortedPosts[0].id);
      }
      else {
        const randomIndex = Math.floor(Math.random() * listOfPosts.length);
        console.log("randomIndex", randomIndex);
        setCurrentPost(listOfPosts[randomIndex]);
      }
    } else {
      const randomIndex = Math.floor(Math.random() * listOfPosts.length);
      console.log("randomIndex", randomIndex);
      setCurrentPost(listOfPosts[randomIndex]);
    }
    if(prev === currentPost) {
      const randomIndex = Math.floor(Math.random() * listOfPosts.length);
      console.log("randomIndex", randomIndex);
      setCurrentPost(listOfPosts[randomIndex]);
    }
  };

  const handleAddAfterCurrent1 = () => {
    // const currentPost = listOfPosts[currentPostIndex];
    setPosts();
    if(currentPost!=null) addinteract1(currentPost.id);
    selectNextPost();
  };

  const handleAddAfterCurrent2 = () => {
    // const currentPost = listOfPosts[currentPostIndex];
    setPosts();
    if(currentPost!=null) addinteract2(currentPost.id);
    selectNextPost();
  };

  const handleAddAfterCurrent3 = () => {
    // const currentPost = listOfPosts[currentPostIndex];
    setPosts();
    if(currentPost!=null) addinteract3(currentPost.id);
    selectNextPost();
  };

  return (
    <div>
      <div>&nbsp;</div>
      {(listOfPosts.length > 0 && currentPost!=null) ? (
        <div>
        <div
          className="card"
          style={{
            minHeight: '32vw',
            width: '72vw',
            backgroundColor: 'deepskyblue',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius:'4vw'
          }}
        >
          {/* {console.log(currentPost)} */}
          <Card
            question={currentPost.question}
            answer={currentPost.answer}
          />
          </div>
          <div>
          <div align='center' >
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
      <button onClick={handleAddAfterCurrent2}
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
    }}>Difficult</button>
    </div>
        </div>
       
        </div>
      ) : (
        <div>
          <h3> Congratulations! You're done reviewing.</h3>
        </div>
      )}
      
    </div>
  );
  
}

export default Home;
