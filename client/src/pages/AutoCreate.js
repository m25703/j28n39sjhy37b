import React, { useState } from 'react';
import axios from 'axios';

const AutoCreate = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [reply, setReply] = useState('');

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  const handleContentChange = (e) => {
    setContent(e.target.value);
  };

  const handleSend = async () => {
    try {
      const payload = {
        messages: [
          { role: 'system', content: 'You are a helpful assistant.' },
          { role: 'user', content: content },
        ],
        max_tokens: 50,
      };
  
      const response = await axios.post('/api', payload, {
        headers: {
          Authorization: 'Bearer --enter custom token--',
          'Content-Type': 'application/json',
        },
      });
  
      const reply = response.data.choices[0].message.content;
      setReply(reply);
    } catch (error) {
      console.error('Error in API call:', error);
    }
  };
  
  return (
    <div>
      <h1>Chat Page</h1>
      <label htmlFor="title">Title:</label>
      <input type="text" id="title" value={title} onChange={handleTitleChange} />

      <label htmlFor="content">Content:</label>
      <textarea
        id="content"
        value={content}
        onChange={handleContentChange}
        style={{ width: '75%', height: '75vh' }}
      />

      <button onClick={handleSend}>Send</button>

      {reply && (
        <div>
          <h2>ChatGPT Reply:</h2>
          <p>{reply}</p>
        </div>
      )}
    </div>
  );
};

export default AutoCreate;
