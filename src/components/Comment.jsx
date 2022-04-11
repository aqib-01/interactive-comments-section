import React from "react";
import Reply from "./Reply";
import CommentDeleteModal from "./CommentDeleteModal";
import { useContext, useState, useRef, useEffect } from "react";
import { Context } from "../App";
import { useClickOutside } from "../Hooks";
import { getTimeDif } from "../functions";
const Comment = ({ commentData }) => {
  // ======================== States Start ======================================
  const [isReplyInputOpen, setIsReplyInputOpen] = useState(false);
  const [isScorePlusDisabled, setIsScorePlusDisabled] = useState(false);
  const [isScoreMinusDisabled, setIsScoreMinusDisabled] = useState(true);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isContentEditable, setIsContentEditable] = useState(false);
  // ======================== States End ======================================

  // ======================== Context Values Start ======================================
  const {
    data,
    handleAddReply,
    handleAddCommentScore,
    handleRemoveCommentScore,
    handleEditComment,
  } = useContext(Context);

  const { currentUser } = data;
  const { replies } = commentData;
  // ======================== Context Values End ======================================

  // ======================== Refs Start ======================================
  const replyInput = useRef();
  const content = useRef();
  const replyContainer = useRef();
  const replyBtn = useRef();
  // ======================== Refs End ======================================

  // ======================== Event Listeners Start ======================================
  const handleReplyInputToggle = () => {
    if (!isReplyInputOpen) {
      setIsReplyInputOpen(true);
    } else if (isReplyInputOpen) {
      setIsReplyInputOpen(false);
    }
  };
  useClickOutside(replyContainer, replyBtn, () => {
    if (isReplyInputOpen) {
      setIsReplyInputOpen(false)
    }
  });
  const openDeleteModal = () => {
    setIsDeleteModalOpen(true);
    document.body.classList.add("overflow-hidden");
  };
  const closeDeleteModal = () => {
    setIsDeleteModalOpen(false);
    document.body.classList.remove("overflow-hidden");
  };
  const handleEditableTrue = () => {
    setIsContentEditable(true);
  };
  const handleEditablefalse = () => {
    setIsContentEditable(false);
  };
  useEffect(() => {
    if (replyInput.current) {
      replyInput.current.focus();
    }
  }, [isReplyInputOpen]);
  useEffect(() => {
    if (content.current) {
      content.current.focus();
    }
  }, [isContentEditable]);
  // ======================== Event Listeners End ======================================

  // ======================== JSX Markup Start ======================================
  return (
    <>
      {isDeleteModalOpen && (
        <CommentDeleteModal
          closeDeleteModal={closeDeleteModal}
          commentData={commentData}
        />
      )}
      <section className="comment-sect">
        <div className="flex items-center col-span-12 md:order-2 md:col-span-6">
          <img className="dp-img" src={commentData.user.image.png} alt="" />
          <h5 className="ml-3 text-dark-blue font-semibold xs:text-lg">
            {commentData.user.username}
          </h5>
          {commentData.user.username === currentUser.username && (
            <span className="bg-moderate-blue text-white py-1 px-1 text-sm rounded-md ml-2">
              You
            </span>
          )}

          <p className="ml-4 text-sm xs:text-base text-grayish-blue ">
            {getTimeDif(commentData.createdAt)}
          </p>
        </div>
        {/* // ======================== Comment Content Start ====================================== */}
        <p
          ref={content}
          contentEditable={
            commentData.user.username === currentUser.username &&
            isContentEditable
          }
          className={`${
            isContentEditable &&
            commentData.user.username === currentUser.username &&
            "px-4 p-2 editable"
          } content mt-3 md:mt-0 col-span-12 md:col-start-2 md:col-end-13 text-grayish-blue md:order-4`}
        >
          {commentData.content}
        </p>
        {/* // ======================== Comment Content End ====================================== */}

        {/* // ======================== Score Btns Start ====================================== */}
        <div className="score-btns md:row-span-2 md:order-1 md:col-span-1">
          {/* // =========== Plus Score Btn ========== */}

          <button
            disabled={
              localStorage.getItem(`isScorePlusDisabled${commentData.id}`)
                ? JSON.parse(
                    localStorage.getItem(`isScorePlusDisabled${commentData.id}`)
                  )
                : isScorePlusDisabled
            }
            onClick={() => {
              handleAddCommentScore(commentData);
              setIsScorePlusDisabled(true);

              localStorage.setItem(
                `isScorePlusDisabled${commentData.id}`,
                true
              );
              setIsScoreMinusDisabled(false);
              localStorage.setItem(
                `isScoreMinusDisabled${commentData.id}`,
                false
              );
            }}
          >
            <img src="images/icon-plus.svg" alt="" />
          </button>
          <p className="text-moderate-blue font-semibold">
            {commentData.score}
          </p>

          {/* // =========== Minus Score Btn ========== */}

          <button
            disabled={
              localStorage.getItem(`isScoreMinusDisabled${commentData.id}`)
                ? JSON.parse(
                    localStorage.getItem(
                      `isScoreMinusDisabled${commentData.id}`
                    )
                  )
                : isScoreMinusDisabled
            }
            onClick={() => {
              handleRemoveCommentScore(commentData);
              setIsScorePlusDisabled(false);

              localStorage.setItem(
                `isScorePlusDisabled${commentData.id}`,
                false
              );
              setIsScoreMinusDisabled(true);
              localStorage.setItem(
                `isScoreMinusDisabled${commentData.id}`,
                true
              );
            }}
          >
            <img src="images/icon-minus.svg" alt="" />
          </button>
        </div>
        {/* // ======================== Score Btns End ====================================== */}

        {/* // ======================== Edit, Delete, Reply, Update Btns Start ====================================== */}
        {commentData.user.username === currentUser.username ? (
          <>
            {!isContentEditable ? (
              <div className="edit-del-btns md:order-3 md:col-span-5">
                {/* // =========== Delete Btn ========== */}

                <button
                  onClick={openDeleteModal}
                  className="flex items-center "
                >
                  <img src="./images/icon-delete.svg" alt="" />
                  <span className="text-soft-red ml-1">Delete</span>
                </button>

                {/* // =========== Edit Btn ========== */}

                <button
                  onClick={() => {
                    handleEditableTrue();
                  }}
                  className="flex items-center ml-3 xs:ml-4"
                >
                  <img src="./images/icon-edit.svg" alt="" />
                  <span className="text-moderate-blue ml-1">Edit</span>
                </button>
              </div>
            ) : (
              //  =========== Update Btn ==========
              <button
                onClick={() => {
                  handleEditComment(commentData, content.current.textContent);
                  handleEditablefalse();
                }}
                className="btn-blue mt-4 md:mt-0 md:order-3 md:col-span-5"
              >
                Update
              </button>
            )}
          </>
        ) : (
          //  =========== Reply Btn ==========
          <button
            ref={replyBtn}
            onClick={() => handleReplyInputToggle()}
            className={`reply-btn reply-btn-${commentData.id} md:order-3 md:col-span-5`}
          >
            <img src="./images/icon-reply.svg" alt="" />
            <p className="text-moderate-blue text-lg font-semibold">Reply</p>
          </button>
        )}
        {/* // ======================== Edit, Delete, Reply, Update Btns End ====================================== */}
      </section>
      {/* // ======================== User Section Start ====================================== */}
      {isReplyInputOpen && (
        <>
          <div
            ref={replyContainer}
            className={`user-section user-section-${commentData.id}`}
          >
            <textarea
              ref={replyInput}
              placeholder="Add a reply"
              name=""
              id=""
              className="comment-input md:order-2"
            ></textarea>
            <img
              className="user-img md:order-1"
              src={currentUser.image.png}
              alt=""
            />
            <button
              onClick={() => {
                handleAddReply(
                  commentData,
                  replyInput.current.value,
                  currentUser,
                  commentData.user.username
                );

                if (replyInput.current.value) {
                  setIsReplyInputOpen(false);
                }
                replyInput.current.value = "";
              }}
              className="btn-blue md:order-3"
            >
              SEND
            </button>
          </div>
        </>
      )}
      {/* // ======================== User Section End ====================================== */}

      {/* // ======================== Replies Section Start ====================================== */}
      <div className="replies-wrapper relative">
        {replies.map((reply) => (
          <Reply key={reply.id} commentData={commentData} replyData={reply} />
        ))}
      </div>
      {/* // ======================== Replies Section End ====================================== */}
    </>
  );
  // ======================== JSX Markup End ======================================
};

export default Comment;
