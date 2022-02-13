import React from "react";
import { useContext } from "react";
import { Context } from "../App";
const ReplyDeleteModal = ({ closeDeleteModal, commentData, replyData }) => {
  const { handleDeleteReply } = useContext(Context);
  return (
    <div className="fixed bg-black inset-0 bg-opacity-50 z-10 flex items-center justify-center">
      <div className="p-7 bg-white rounded-lg wrapper delete-modal">
        <h4 className="text-dark-blue text-xl font-bold">Delete Reply</h4>
        <p className="text-grayish-blue mt-5">
          Are you sure want to delete this reply? This will remove the reply
          and can't be undone.
        </p>
        <div className="mt-5 flex items-center">
          <button
            onClick={closeDeleteModal}
            className="flex-1 bg-grayish-blue px-4 py-3 text-white rounded-md font-semibold text-sm xs:text-lg active:opacity-50 hover:opacity-50 "
          >
            NO, CANCEL
          </button>
          <button
            onClick={() => {
              handleDeleteReply(commentData, replyData);
              closeDeleteModal();
            }}
            className="flex-1 bg-soft-red px-4 py-3 text-white rounded-md font-semibold  text-sm xs:text-lg active:opacity-50  hover:opacity-50 ml-5"
          >
            YES, DELETE
          </button>
        </div>
      </div>
    </div>
  );
};

export default ReplyDeleteModal;
