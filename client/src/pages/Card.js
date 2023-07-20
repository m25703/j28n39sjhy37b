import React, { useState } from 'react';

const Card = ({ question, answer }) => {
  const [showAnswer, setShowAnswer] = useState(false);

  const toggleAnswer = () => {
    setShowAnswer(!showAnswer);
  };

  return (
    <div className="card" style={{ width: '90%' }}>
      <center>
        <div
          className="card-question"
          style={{
            marginTop: '1vw',
            minHeight: '9vw',
            textAlign: 'center',
            color: 'white',
            fontFamily:
              'Roobert,-apple-system,BlinkMacSystemFont,"Segoe UI",Helvetica,Arial,sans-serif,"Apple Color Emoji","Segoe UI Emoji","Segoe UI Symbol"',
            fontSize: '3vw',
            fontWeight: '600'
          }}
        >
          {question}
        </div>
        <div
          style={{
            minHeight: '10.5vw',
            width: '80%',
            textAlign: 'center',
            verticalAlign: 'middle',
            fontFamily:
              'Roobert,-apple-system,BlinkMacSystemFont,"Segoe UI",Helvetica,Arial,sans-serif,"Apple Color Emoji","Segoe UI Emoji","Segoe UI Symbol"',
            fontSize: '3vw'
          }}
        >
          {showAnswer && <div className="card-answer" style={{verticalAlign: 'middle'}}>{answer}</div>}
        </div>
        <div>
          <button
            className="card-toggle"
            onClick={toggleAnswer}
            style={{
              appearance: 'none',
              backgroundColor: '#0a0a0a',
              borderRadius: '2vw',
              borderStyle: 'none',
              color: '#FFFFFF',
              cursor: 'pointer',
              fontFamily:
                'Roobert,-apple-system,BlinkMacSystemFont,"Segoe UI",Helvetica,Arial,sans-serif,"Apple Color Emoji","Segoe UI Emoji","Segoe UI Symbol"',
              fontSize: '2vw',
              lineHeight: 'normal',
              padding:'0.75vw 1.66vw 0.66vw',
              minWidth: '0',
              outline: 'none',
              textAlign: 'center',
              textDecoration: 'none',
              transition: 'all 300ms cubic-bezier(.23, 1, 0.32, 1)',
              userSelect: 'none',
              touchAction: 'manipulation',
              width: '16vw',
              margin:'0.75vw',
              willChange: 'transform'
            }}
          >
            {showAnswer ? 'Hide Answer' : 'Show Answer'}
          </button>
        </div>
      </center>
    </div>
  );
};

export default Card;



// return (
//   <div>
//     {(listOfPosts.length > 0) ? (
//       <div>
//       <div
//         className="card"
//         style={{
//           minHeight: '32vw',
//           width: '72vw',
//           backgroundColor: 'deepskyblue',
//           display: 'flex',
//           justifyContent: 'center',
//           alignItems: 'center',
//           borderRadius:'4vw'
//         }}
//       >
//         {}
//         <Card
          
//           question={listOfPosts[currentPostIndex].question}
//           answer={listOfPosts[currentPostIndex].answer}
//         />
//       </div>
//       <button onClick={goToNextPost}>Next Post</button>
//       </div>
//     ) : (
//       <div>
//         <h3>{currentPostIndex} {listOfPosts.length} Congratulations! You're done studying.</h3>
//       </div>
//     )}
//   </div>
// );

// }

// export default Home;
