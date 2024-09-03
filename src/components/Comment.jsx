import React, { useState } from 'react';
import useStore from '../store/useStore';
import styles from './Comment.module.css';
import ReplyButton from './ReplyButton';
import juliusomo from '../../public/avatars/image-juliusomo.png';

const Comment = ({ commentId }) => {
  const { comments, addReply, deleteReply, increaseLikes, decreaseLikes, deleteComment } = useStore();
  const comment = comments.find((c) => c.id === commentId);

  const [isReplying, setIsReplying] = useState(null);
  const [replyText, setReplyText] = useState("");

  if (!comment) return <div>Comment not found</div>;

  const handleReplyClick = (replyId) => {
    setIsReplying(replyId);
  };

  const handleInputChange = (e) => {
    setReplyText(e.target.value);
  };

  const handleSubmit = (replyId) => {
    if (replyText.trim()) {
      addReply(replyId || commentId, replyText, "juliusomo", juliusomo);
      setReplyText("");
      setIsReplying(null);
    }
  };

  const handleDeleteReply = (replyId) => {
    deleteReply(commentId, replyId);
  };

  const handleLikeComment = () => {
    increaseLikes(commentId);
  };

  const handleDislikeComment = () => {
    decreaseLikes(commentId);
  };

  const handleLikeReply = (replyId) => {
    increaseLikes(commentId, replyId);
  };

  const handleDislikeReply = (replyId) => {
    decreaseLikes(commentId, replyId);
  };

  const handleDeleteComment = () => {
    deleteComment(commentId);
  };

  const renderReplies = (replies) => {
    return replies.map((reply) => (
      <div key={reply.id} className={styles.replyContainer}>
        <div className={styles.lkButton}>
          <button onClick={() => handleLikeReply(reply.id)} className={styles.likeButton}>+</button>
          <span className={styles.likes}>{reply.likes}</span>
          <button onClick={() => handleDislikeReply(reply.id)} className={styles.dislikeButton}>-</button>
        </div>
        <img
          src={reply.image}
          alt={`${reply.author}'s avatar`}
          className={styles.commentImage}
        />
        <div className={styles.authorAndDate}>
          <span className={styles.author}>{reply.author}</span>
          <span className={styles.date}>{reply.date}</span>
        </div>
        <div className={styles.commentText}>
          <p>{reply.text}</p>
        </div>
        <button onClick={() => handleDeleteReply(reply.id)} className={styles.deleteButton}>
          Delete
        </button>
        <ReplyButton
          onClick={() => handleReplyClick(reply.id)}
          className={styles.replyButton}
        />
        {isReplying === reply.id && (
          <div className={styles.replyContainerWrapper}>
            <div className={styles.comment}>
              <div className={styles.lkButton}>
                <button onClick={() => handleLikeComment()} className={styles.likeButton}>+</button>
                <button onClick={() => handleDislikeComment()} className={styles.dislikeButton}>-</button>
              </div>
              <div className={styles.restcomment}>
                <div className={styles.topcomment}>
                  <div className={styles.namecomment}>
                    <img
                      src={juliusomo}
                      alt="Your avatar"
                      className={styles.commentImage}
                    />
                    <span className={styles.author}>juliusomo</span>
                  </div>
                </div>
                <div className={styles.commentText}>
                  <input
                    type="text"
                    value={replyText}
                    onChange={handleInputChange}
                    placeholder="Write your reply..."
                    className={styles.replyInput}
                  />
                  <button
                    onClick={() => handleSubmit(reply.id)}
                    className={styles.submitButton}
                  >
                    Reply
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
        {reply.replies && reply.replies.length > 0 && (
          <div className={styles.nestedReplies}>
            {renderReplies(reply.replies)}
          </div>
        )}
      </div>
    ));
  };

  return (
    <div className={styles.card}>
      {/* First child: comment */}
      <div className={styles.comment}>
        <div className={styles.lkButton}>
          <button onClick={handleLikeComment} className={styles.likeButton}>+</button>
          <span className={styles.likes}>{comment.likes}</span>
          <button onClick={handleDislikeComment} className={styles.dislikeButton}>-</button>
        </div>
        <div className={styles.restcomment}>
          <div className={styles.topcomment}>
            <div className={styles.namecomment}>
              <img
                src={comment.image}
                alt={`${comment.author}'s avatar`}
                className={styles.commentImage}
              />
              <span className={styles.author}>{comment.author}</span>
              <span className={styles.date}>{comment.date}</span>
            </div>
            <div className={styles.replyComment}>
              <ReplyButton
                onClick={() => handleReplyClick(commentId)}
                className={styles.replyButtoncomment}
              />
            </div>
          </div>
          <div className={styles.commentText}>
            <p>{comment.text}</p>
          </div>
        </div>
      </div>

      {/* Second child: replyContainer */}
      <div className={styles.replyContainerWrapper}>
        {isReplying === commentId && (
          <div className={styles.comment}>
            <div className={styles.lkButton}>
              <button onClick={handleLikeComment} className={styles.likeButton}>+</button>
              <button onClick={handleDislikeComment} className={styles.dislikeButton}>-</button>
            </div>
            <div className={styles.restcomment}>
              <div className={styles.topcomment}>
                <div className={styles.namecomment}>
                  <img
                    src={juliusomo}
                    alt="Your avatar"
                    className={styles.commentImage}
                  />
                  <span className={styles.author}>juliusomo</span>
                </div>
              </div>
              <div className={styles.commentText}>
                <input
                  type="text"
                  value={replyText}
                  onChange={handleInputChange}
                  placeholder="Write your reply..."
                  className={styles.replyInput}
                />
                <button
                  onClick={() => handleSubmit(commentId)}
                  className={styles.submitButton}>
                  Reply
                </button>
              </div>
            </div>
          </div>
        )}
        {renderReplies(comment.replies)}
      </div>
    </div>
  );
};

export default Comment;
