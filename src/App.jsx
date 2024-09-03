import React from 'react';
import Comment from './components/Comment';
import useStore from './store/useStore';
import '../src/App.css';
import NewComment from './components/NewComment';

const App = () => {
  const { comments } = useStore();

  return (
    <>
      <div className="grid-container">
        {comments.map((comment) => (
          <Comment key={comment.id} commentId={comment.id} />
        ))}
      </div>
      <NewComment />
    </>
  );
};

export default App;
