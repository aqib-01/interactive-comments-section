import React from "react";
import { useContext, useRef } from "react";
import { Context } from "../App";

const User = () => {
  const { data, handleAddComment } = useContext(Context);
  const { currentUser } = data;
  const commentInput = useRef();
  return (
    <section className="user-section user-section-main">
      <textarea
        ref={commentInput}
        placeholder="Add a comment"
        className="comment-input md:order-2"
      ></textarea>
      <img className="user-img md:order-1" src={currentUser.image.png} alt="" />
      <button
        onClick={() => {
          handleAddComment(commentInput.current.value, currentUser);
          commentInput.current.value = ''
        }}
        className="btn-blue md:order-3"
      >
        SEND
      </button>
    </section>
  );
};

export default User;
