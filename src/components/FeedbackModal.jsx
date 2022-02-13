import React from "react";
import { useEffect, useContext } from "react";
import { Context } from "../App";
const FeedbackModal = ({ data }) => {
  const { closeFeedbackModal } = useContext(Context);
  useEffect(() => {
    if (data.isOpen) {
      setTimeout(() => {
        closeFeedbackModal();
      }, 2000);
    }
  }, [data.isOpen]);
  return (
    <div
      className={` ${data.bg} ${data.color} ${
        data.isOpen ? " show " : " hide "
      } feedback-modal text-center rounded-md text-lg font-semibold fixed px-4 py-2 z-20 left-0 right-0 top-2 shadow-lg mx-auto`}
    >
      {data.text}
    </div>
  );
};

export default FeedbackModal;
