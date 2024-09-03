import React from "react";
import styles from "../components/ReplyButton.module.css"; 


const ReplyButton = ({ onClick }) => {
  return (
    <button className={styles.replyButtoncomment} onClick={onClick}>
      <img src='../../public/avatars/icon-reply.svg' className={styles.replyButtoncomment} alt="Reply Icon" />
      Reply
    </button>
  );
};

export default ReplyButton;