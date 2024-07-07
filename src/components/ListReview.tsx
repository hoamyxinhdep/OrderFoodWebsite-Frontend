import { Reply, Review } from "@/types";
import { FormEvent, useState } from "react";
import moment from "moment";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit } from "@fortawesome/free-solid-svg-icons";
import {
  useCreateReply,
  useDeleteReviews,
  useUpdateReview,
} from "@/api/RestaurantApi";

type Props = {
  review: Review;
  refetch: () => void;
};
type PropsRep = {
  reply: Reply;
};

const ListReview = ({ review, refetch }: Props) => {
  const [isReplying, setIsReplying] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [reply, setReply] = useState<string>();
  const [currentReview, setCurrentReview] = useState(review.comment);
  const { updateComment } = useUpdateReview(review._id);
  const { createReplies } = useCreateReply(review._id);
  const { deleteComment } = useDeleteReviews(review._id);
  const handleReplyClick = () => {
    setIsReplying(!isReplying);
  };

  const handleCreateReplyClick = (e: FormEvent) => {
    e.preventDefault();
    if (reply && reply !== "") {
      const formData = new FormData();
      formData.append("text", reply);
      createReplies(formData);
      setTimeout(() => {
        refetch();
      }, 1000);
      setReply("");
      setIsReplying(false);
    }
  };

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleSaveClick = (e: FormEvent) => {
    e.preventDefault();
    if (currentReview && currentReview !== "") {
      const formData = new FormData();
      formData.append("comment", currentReview);
      updateComment(formData);
      setIsEditing(false);
      setTimeout(() => {
        refetch();
      }, 1000);
    }
  };

  const handleDeleteClick = () => {
    deleteComment();
    setTimeout(() => {
      refetch();
    }, 800);
  };

  return (
    <div className="p-4 rounded-xl">
      <div className="flex items-start gap-4">
        <div className="flex-shrink-0">
          <img
            src={review.avatar}
            alt="Avatar"
            className="w-16 h-16 rounded-full"
          />
        </div>
        <div className="flex flex-col flex-grow">
          <div className="border p-4 rounded-xl shadow-md relative">
            <span
              className="absolute top-2 right-2 cursor-pointer"
              onClick={handleEditClick}
            >
              <FontAwesomeIcon
                icon={faEdit}
                className="text-gray-600 hover:text-gray-800"
              />
            </span>
            <span className="text-base font-bold mb-2">
              {review.user.email}
            </span>
            {isEditing ? (
              <form onSubmit={handleSaveClick}>
                <textarea
                  className="w-full border rounded p-2"
                  value={currentReview}
                  onChange={(e) => setCurrentReview(e.target.value)}
                />
                <button
                  type="submit"
                  className="mt-2 px-4 py-2 bg-blue-500 text-white rounded"
                >
                  Save
                </button>
              </form>
            ) : (
              <div className="text-base">{review.comment}</div>
            )}
            <div>
              <span className="text-sm text-gray-500 mt-2">
                {moment(review.createdAt).startOf("hour").fromNow()}
              </span>
              <button
                className="ml-6 text-blue-500 hover:underline"
                onClick={handleReplyClick}
              >
                Reply
              </button>
              <button
                className="ml-2 text-red-500 hover:underline"
                onClick={handleDeleteClick}
              >
                Delete
              </button>
              {isReplying && (
                <form className="mt-4" onSubmit={handleCreateReplyClick}>
                  <input
                    className="w-full border rounded p-2"
                    placeholder="Input your reply here"
                    value={reply}
                    onChange={(e) => setReply(e.target.value)}
                  />
                  <button
                    type="submit"
                    className="mt-2 px-4 py-2 bg-blue-500 text-white rounded"
                  >
                    Submit
                  </button>
                </form>
              )}
            </div>
          </div>
          <div className="mt-4">
            {review.replies.map((reply, index) => (
              <ListReply key={index} reply={reply} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
const ListReply = ({ reply }: PropsRep) => {
  return (
    <div className="flex items-start gap-4">
      <div className="flex-shrink-0">
        <img
          src={reply.avatar}
          alt="Avatar"
          className="w-16 h-16 rounded-full"
        />
      </div>
      <div className="flex flex-col flex-grow border p-4 rounded-xl shadow-md">
        <span className="text-base font-bold mb-2">{reply.user.email}</span>
        <div className="text-base">{reply.text}</div>
        <div>
          <span className="text-sm text-gray-500 mt-2">
            {moment(reply.createdAt).endOf("day").fromNow()}
          </span>
        </div>
      </div>
    </div>
  );
};

export default ListReview;
