import { Reply, Review } from "@/types";
import { useState } from "react";

type Props = {
  review: Review;
  reply: Reply;
};

const Replylist: Reply[] = [
  {
    avatar: "abc",
    name: "A",
    date: "7/1/2024",
    text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Nobis eligendi, ipsum nemo deserunt cumque explicabo possimus, odio illum labore enim eius reprehenderit debitis! Exercitationem molestias amet ad vel provident eius!,",
  },
];
const ListReview = ({ review }: Props) => {
  const [isReplying, setIsReplying] = useState(false);

  const handleReplyClick = () => {
    setIsReplying(!isReplying);
  };

  return (
    <div className="border p-4 rounded shadow-md">
      <div className="flex items-start gap-4">
        <div className="flex-shrink-0">
          <img
            src={review.avatar}
            alt="Avatar"
            className="w-16 h-16 rounded-full"
          />
        </div>
        <div className="flex flex-col flex-grow">
          <span className="text-lg font-bold mb-2">{review.name}</span>
          <div className="text-lg">{review.cmt}</div>
          <div>
            <span className="text-sm text-gray-600 mt-2">{review.date}</span>
            <button
              className="mt-4 ml-6 text-blue-500 hover:underline"
              onClick={handleReplyClick}
            >
              Reply
            </button>
            {isReplying && (
              <div className="mt-4 ">
                <textarea
                  className="w-full border rounded p-2"
                  placeholder="Input your reply here"
                  style={{ resize: "none" }}
                />
                <button className="mt-2 px-4 py-2 bg-blue-500 text-white rounded">
                  Submit
                </button>
              </div>
            )}
          </div>
          <div>
            {Replylist.map((reply, index) => (
              <ListReply key={index} reply={reply} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
const ListReply = ({ reply }: Props) => {
  return (
    <div className="flex items-start gap-4">
      <div className="flex-shrink-0">
        <img
          src={reply.avatar}
          alt="Avatar"
          className="w-16 h-16 rounded-full"
        />
      </div>
      <div className="flex flex-col flex-grow">
        <span className="text-lg font-bold mb-2">{reply.name}</span>
        <div className="text-lg">{reply.text}</div>
        <div>
          <span className="text-sm text-gray-600 mt-2">{reply.date}</span>
        </div>
      </div>
    </div>
  );
};

export default ListReview;
