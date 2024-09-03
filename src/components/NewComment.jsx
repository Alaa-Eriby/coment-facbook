import React, { useState } from 'react';
import useStore from '../store/useStore'; 

import './NewComment.css';
import newImage from '../../public/avatars/image-juliusomo.png';

const NewComment = () => {
  const [newCommentText, setNewCommentText] = useState("");
  const addComment = useStore((state) => state.addComment); 

  const handleInputChange = (e) => {
    setNewCommentText(e.target.value);
  };

  const handleSubmit = () => {
    if (newCommentText.trim()) {
      addComment(newCommentText, "newauthor", newImage ); 
      setNewCommentText("");
    }
  };

  return (
    <div className='new'>
      <div className='adder--body'>
        <img src={newImage} alt="New Comment Icon" className='new-comment-image' />
        <textarea
        className='adder-textbox'
          value={newCommentText}
          onChange={handleInputChange}
          placeholder="Add a comment..."
        />
        <button className='adder-send' onClick={handleSubmit}>SEND</button>
      </div>
    </div>
  );
};

export default NewComment;
