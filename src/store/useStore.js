import { create } from 'zustand';
import { v4 as uuidv4 } from 'uuid'; 
import amyRobsonImage from '../../public/avatars/image-amyrobson.png'; 
import ramsesmiron from '../../public/avatars/image-ramsesmiron.png'; 
import maxBlagunImage from '../../public/avatars/image-maxblagun.png'; 

const useStore = create((set) => ({
  comments: [
    {
      id: uuidv4(),
      text: "Impressive! Though it seems the drag feature could be improved. But overall it looks incredible. You've nailed the design and the responsiveness at various breakpoints works really well.",
      author: "amyrobson",
      date: "1 month ago",
      likes: 0,
      image: amyRobsonImage, 
      replies: []
    },
    {
      id: uuidv4(),
      text: "Woah, your project looks awesome! How long have you been coding for? I'm still new, but think I want to dive into React as well soon. Perhaps you can give me an insight on where I can learn React? Thanks!",
      author: "maxblagun",
      date: "2 weeks ago",
      likes: 0,
      image: maxBlagunImage, 
      replies: []
    },
    {
      id: uuidv4(),
      text: "If you're still new, I'd recommend focusing on the fundamentals of HTML, CSS, and JS before considering React. It's very tempting to jump ahead but lay a solid foundation first.",
      author: "ramsesmiron",
      date: "1 week ago",
      likes: 0,
      image: ramsesmiron, 
      replies: []
    },
  ],

  addComment: (text, author, image) => set((state) => ({
    comments: [
      ...state.comments,
      {
        id: uuidv4(),
        text,
        author,
        date: new Date().toLocaleString(), 
        likes: 0,
        image,
        replies: []
      }
    ]
  })),

  addReply: (commentId, text, author, image) => set((state) => ({
    comments: state.comments.map(comment =>
      comment.id === commentId
        ? {
            ...comment,
            replies: [
              ...comment.replies,
              {
                id: uuidv4(), 
                text,
                author,
                date: new Date().toLocaleString(), 
                likes: 0,
                image,
              }
            ]
          }
        : comment
    )
  })),

  deleteReply: (commentId, replyId) => set((state) => ({
    comments: state.comments.map(comment =>
      comment.id === commentId
        ? {
            ...comment,
            replies: comment.replies.filter(reply => reply.id !== replyId)
          }
        : comment
    )
  })),

  increaseLikes: (commentId, replyId = null) => set((state) => ({
    comments: state.comments.map(comment => {
      if (comment.id === commentId) {
        if (replyId) {
          return {
            ...comment,
            replies: comment.replies.map(reply =>
              reply.id === replyId
                ? { ...reply, likes: reply.likes + 1 }
                : reply
            )
          };
        }
        return { ...comment, likes: comment.likes + 1 };
      }
      return comment;
    })
  })),

  decreaseLikes: (commentId, replyId = null) => set((state) => ({
    comments: state.comments.map(comment => {
      if (comment.id === commentId) {
        if (replyId) {
          return {
            ...comment,
            replies: comment.replies.map(reply =>
              reply.id === replyId
                ? { ...reply, likes: reply.likes > 0 ? reply.likes - 1 : 0 }
                : reply
            )
          };
        }
        return { ...comment, likes: comment.likes > 0 ? comment.likes - 1 : 0 };
      }
      return comment;
    })
  })),

  deleteComment: (commentId) => set((state) => ({
    comments: state.comments.filter(comment => comment.id !== commentId)
  })),
}));

export default useStore;

