import React from "react";
import { useEffect, useReducer } from "react";
import Loading from "./components/Loading";
import User from "./components/User";
import FeedbackModal from "./components/FeedbackModal";
import Comment from "./components/Comment";
import { v4 as uuidv4 } from "uuid";
 
export const Context = React.createContext();
// ======================================================================================================================

//                                                 State, Action Handling Start

// ======================================================================================================================
const reducer = (state, action) => {
  if (action.type === "INITIAL_DATA") {
    const intialData = action.payload;
    return {
      ...state,
      data: intialData,
    };
  }

  if (action.type === "ADD_COMMENT") {
    const newData = action.payload;
    return {
      ...state,
      data: newData,
      feedbackModal: {
        isOpen: true,
        bg: "bg-grayish-blue",
        color: "text-white",
        text: "Comment Added !!!",
      },
    };
  }

  if (action.type === "DELETE_COMMENT") {
    const newData = action.payload;
    return {
      ...state,
      data: newData,
      feedbackModal: {
        isOpen: true,
        bg: "bg-soft-red",
        color: "text-white",
        text: "Comment Deleted !!!",
      },
    };
  }

  if (action.type === "ADD_REPLY") {
    const newData = action.payload;
    return {
      ...state,
      data: newData,
      feedbackModal: {
        isOpen: true,
        bg: "bg-grayish-blue",
        color: "text-white",
        text: "Reply Added !!!",
      },
    };
  }

  if (action.type === "DELETE_REPLY") {
    const newData = action.payload;
    return {
      ...state,
      data: newData,
      feedbackModal: {
        isOpen: true,
        bg: "bg-soft-red",
        color: "text-white",
        text: "Reply Deleted !!!",
      },
    };
  }

  if (action.type === "EDIT_COMMENT") {
    const newData = action.payload;
    return {
      ...state,
      data: newData,
      feedbackModal: {
        isOpen: true,
        bg: "bg-grayish-blue",
        color: "text-white",
        text: "Comment Updated !!!",
      },
    };
  }

  if (action.type === "EDIT_REPLY") {
    const newData = action.payload;
    return {
      ...state,
      data: newData,
      feedbackModal: {
        isOpen: true,
        bg: "bg-grayish-blue",
        color: "text-white",
        text: "Reply Updated !!!",
      },
    };
  }

  if (action.type === "ADD_SCORE") {
    const newData = action.payload;
    return {
      ...state,
      data: newData,
      feedbackModal: {
        isOpen: true,
        bg: "bg-grayish-blue",
        color: "text-white",
        text: "Score Added !!!",
      },
    };
  }

  if (action.type === "REMOVE_SCORE") {
    const newData = action.payload;
    return {
      ...state,
      data: newData,
      feedbackModal: {
        isOpen: true,
        bg: "bg-soft-red",
        color: "text-white",
        text: "Score Removed !!!",
      },
    };
  }
  if (action.type === "CONTENT_NOT_CHANGED") {
    return {
      ...state,
      feedbackModal: {
        ...state.feedbackModal,
        isOpen: true,
        bg: "bg-soft-red",
        color: "text-white",
        text: "Nothing Changed !!!",
      },
    };
  }
  if (action.type === "INPUT_ERROR") {
    return {
      ...state,
      feedbackModal: {
        ...state.feedbackModal,
        isOpen: true,
        bg: "bg-soft-red",
        color: "text-white",
        text: "Please input a value !!!",
      },
    };
  }

  if (action.type === "CLOSE_FEEDBACK_MODAL") {
    return {
      ...state,
      feedbackModal: {
        ...state.feedbackModal,
        isOpen: false,
      },
    };
  }
};

// ======================================================================================================================

//                                                 State, Action Handling End

// ======================================================================================================================

// ======================== Default State Start ======================================
const defaultState = {
  feedbackModal: {
    isOpen: false,
    bg: "bg-moderate-blue",
    color: "text-white",
    text: "",
  },
};
// ======================== Default State End ========================================
const App = () => {
  const [state, dispatch] = useReducer(reducer, defaultState);
  // ======================================================================================================================

  //                                                 Handle Data Start

  // ======================================================================================================================
  const fetchData = () => {
    fetch("./data.json")
      .then((res) => res.json())
      .then((data) => {
        dispatch({ type: "INITIAL_DATA", payload: data });
        localStorage.setItem("data", JSON.stringify(data));
      });
  };
  useEffect(() => {
    if (!localStorage.data) {
      fetchData();
    } else {
      const data = JSON.parse(localStorage.getItem("data"));
      dispatch({ type: "INITIAL_DATA", payload: data });
    }
  }, []);
  // ======================================================================================================================

  //                                                 Handle Data End

  // ======================================================================================================================

  // ======================================================================================================================

  //                                                 Event Listeners Start

  // ======================================================================================================================

  const handleAddComment = (commentInputValue, currentUser) => {
    if (!commentInputValue) {
      dispatch({ type: "INPUT_ERROR" });
    } else if (commentInputValue) {
      let newComments = [...state.data.comments];
      const newComment = {
        id: uuidv4(),
        content: commentInputValue,
        createdAt: "Just Now",
        score: 0,
        user: { ...currentUser },
        replies: [],
      };
      newComments.push(newComment);
      let newData = { ...state.data, comments: newComments };
      localStorage.setItem("data", JSON.stringify(newData));
      dispatch({ type: "ADD_COMMENT", payload: newData });
    }
  };

  const handleDeleteComment = (commentData) => {
    const newComments = state.data.comments.filter(
      (comment) => comment.id !== commentData.id
    );
    const newData = {
      ...state.data,
      comments: newComments,
    };
    localStorage.setItem("data", JSON.stringify(newData));
    dispatch({ type: "DELETE_COMMENT", payload: newData });
  };
  const handleAddReply = (
    commentData,
    replyInputValue,
    currentUser,
    replyingTo
  ) => {
    if (!replyInputValue) {
      dispatch({ type: "INPUT_ERROR" });
    } else if (replyInputValue) {
      let newComments = state.data.comments;
      const index = newComments.indexOf(commentData);
      const newReply = {
        id: uuidv4(),
        content: replyInputValue,
        createdAt: "Just Now",
        score: 0,
        user: { ...currentUser },
        replyingTo: replyingTo,
        replies: [],
      };
      let newComment = commentData;
      newComment.replies.push(newReply);
      newComments[index] = newComment;
      const newData = {
        ...state.data,
        comments: newComments,
      };
      localStorage.setItem("data", JSON.stringify(newData));
      dispatch({ type: "ADD_REPLY", payload: newData });
    }
  };

  const handleDeleteReply = (commentData, replyData) => {
    let newComments = state.data.comments;
    const index = newComments.indexOf(commentData);
    const newReplies = commentData.replies.filter(
      (reply) => reply.id !== replyData.id
    );
    const newComment = { ...commentData, replies: newReplies };
    newComments[index] = newComment;
    const newData = {
      ...state.data,
      comments: newComments,
    };
    localStorage.setItem("data", JSON.stringify(newData));
    dispatch({ type: "DELETE_REPLY", payload: newData });
  };

  const handleEditComment = (commentData, contentValue) => {
    if (!contentValue) {
      const newComments = state.data.comments.filter(
        (comment) => comment.id !== commentData.id
      );
      const newData = {
        ...state.data,
        comments: newComments,
      };
      localStorage.setItem("data", JSON.stringify(newData));
      dispatch({ type: "DELETE_COMMENT", payload: newData });
    } else if (commentData.content === contentValue) {
      dispatch({ type: "CONTENT_NOT_CHANGED" });
    } else {
      let newComments = state.data.comments;
      const index = newComments.indexOf(commentData);
      const newComment = {
        ...commentData,
        content: contentValue,
      };
      newComments[index] = newComment;
      const newData = {
        ...state.data,
        comments: newComments,
      };
      localStorage.setItem("data", JSON.stringify(newData));
      dispatch({ type: "EDIT_COMMENT", payload: newData });
    }
  };

  const handleEditReply = (commentData, replyData, contentValue) => {
    if (!contentValue) {
      let newComments = state.data.comments;
      const index = newComments.indexOf(commentData);
      const newReplies = commentData.replies.filter(
        (reply) => reply.id !== replyData.id
      );
      const newComment = { ...commentData, replies: newReplies };
      newComments[index] = newComment;
      const newData = {
        ...state.data,
        comments: newComments,
      };
      localStorage.setItem("data", JSON.stringify(newData));
      dispatch({ type: "DELETE_REPLY", payload: newData });
    } else if (replyData.content === contentValue) {
      dispatch({ type: "CONTENT_NOT_CHANGED" });
    } else {
      let newReplies = commentData.replies;
      let newComments = state.data.comments;
      let indexReply = newReplies.indexOf(replyData);
      let indexComment = newComments.indexOf(commentData);
      const newReply = {
        ...replyData,
        content: contentValue,
      };
      newReplies[indexReply] = newReply;
      const newComment = {
        ...commentData,
        replies: newReplies,
      };
      newComments[indexComment] = newComment;
      const newData = {
        ...state.data,
        comments: newComments,
      };
      localStorage.setItem("data", JSON.stringify(newData));
      dispatch({ type: "EDIT_REPLY", payload: newData });
    }
  };

  const handleAddCommentScore = (commentData) => {
    let newComments = state.data.comments;
    const index = newComments.indexOf(commentData);
    const newComment = {
      ...commentData,
      score: commentData.score + 1,
    };
    newComments[index] = newComment;
    const newData = {
      ...state.data,
      comments: newComments,
    };
    localStorage.setItem("data", JSON.stringify(newData));
    dispatch({ type: "ADD_SCORE", payload: newData });
  };

  const handleRemoveCommentScore = (commentData) => {
    let newComments = state.data.comments;
    const index = newComments.indexOf(commentData);
    const newComment = {
      ...commentData,
      score: commentData.score - 1,
    };
    newComments[index] = newComment;
    const newData = {
      ...state.data,
      comments: newComments,
    };
    localStorage.setItem("data", JSON.stringify(newData));
    dispatch({ type: "REMOVE_SCORE", payload: newData });
  };

  const closeFeedbackModal = () => {
    dispatch({ type: "CLOSE_FEEDBACK_MODAL" });
  };

  const handleAddReplyScore = (commentData, replyData) => {
    let newComments = state.data.comments;
    let newComment = commentData;
    const indexComment = newComments.indexOf(commentData);
    const indexReply = newComment.replies.indexOf(replyData);

    const newReply = {
      ...replyData,
      score: replyData.score + 1,
    };
    newComment.replies[indexReply] = newReply;
    newComments[indexComment] = newComment;
    let newData = { ...state.data, comments: newComments };
    localStorage.setItem("data", JSON.stringify(newData));
    dispatch({ type: "ADD_SCORE", payload: newData });
  };

  const handleRemoveReplyScore = (commentData, replyData) => {
    let newComments = state.data.comments;
    let newComment = commentData;
    const indexComment = newComments.indexOf(commentData);
    const indexReply = newComment.replies.indexOf(replyData);

    const newReply = {
      ...replyData,
      score: replyData.score - 1,
    };
    newComment.replies[indexReply] = newReply;
    newComments[indexComment] = newComment;
    let newData = { ...state.data, comments: newComments };
    localStorage.setItem("data", JSON.stringify(newData));
    dispatch({ type: "REMOVE_SCORE", payload: newData });
  };
  // ======================================================================================================================

  //                                                 Event Listeners End

  // ======================================================================================================================

  // =================================== Context Values Start =========================================

  const contextValues = {
    data: state.data,
    handleAddComment: handleAddComment,
    closeFeedbackModal: closeFeedbackModal,
    handleAddReply: handleAddReply,
    handleAddCommentScore: handleAddCommentScore,
    handleRemoveCommentScore: handleRemoveCommentScore,
    handleAddReplyScore: handleAddReplyScore,
    handleRemoveReplyScore: handleRemoveReplyScore,
    handleDeleteComment: handleDeleteComment,
    handleDeleteReply: handleDeleteReply,
    handleEditComment: handleEditComment,
    handleEditReply: handleEditReply,
  };

  // =================================== Context Values End =========================================

  // =================================== JSX App MarkUp Start ========================================
  return (
    <Context.Provider value={contextValues}>
      <FeedbackModal data={state.feedbackModal} />

      {!state.data ? (
        <Loading />
      ) : (
        <div className="wrapper">
          {state.data.comments.map((comment) => (
            <Comment key={comment.id} commentData={comment} />
          ))}

          <User />
        </div>
      )}
    </Context.Provider>
  );
  // =================================== JSX App MarkUp End ========================================
};

export default App;
