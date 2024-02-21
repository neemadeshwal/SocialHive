/* eslint-disable @next/next/no-img-element */
"use client";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHeart,
  faComment,
  faUserCircle,
  faEllipsis,
  faMultiply,
  faBookmark,
  faArrowUpRightFromSquare,
} from "@fortawesome/free-solid-svg-icons";
export default function Saved() {
  const [onHover, setOnHover] = useState(false);
  const [hoverId, setHoverId] = useState("");
  const [clickId, setClickId] = useState("");
  const [showPost, setShowPost] = useState(false);
  const [commentData, setCommentData] = useState({
    comment: "",
    clickedPostId: "",
  });

  function handleMouseIn(id: any) {
    console.log(id);
    setOnHover(true);
    setHoverId(id);
  }
  function handleMouseOut(id: any) {
    setOnHover(false);
    setHoverId("");
  }

  function handleImageClick(id: any) {
    setShowPost(true);
    setClickId(id);
  }
  async function savePost(id: any) {
    try {
      const response = await axios.post("/api/saved", { clickedPostId: id });
    } catch (err: any) {
      console.log(err.any);
    }
  }

  function handleChange() {}

  async function handleComment(id: any) {
    console.log(id);
    setCommentData((prevVal) => ({ ...prevVal, clickedPostId: id }));
    try {
      const response = await axios.post("/api/comment", { commentData });
      // console.log(response.data);
      commentData.comment = "";
    } catch (err: any) {
      console.log(err.message);
    }
  }

  async function handleLike(id: any) {
    try {
      const response = await axios.post("/api/like", { id });
      return response.data;
    } catch (err: any) {
      console.log(err.message);
    }
  }

  const { isLoading, error, data } = useQuery({
    queryKey: ["savedpost"],
    queryFn: () => savedPost(),
  });

  async function savedPost() {
    try {
      const response = await axios.get("/api/saved");
      return response.data;
    } catch (err: any) {
      console.log(err);
    }
  }

  if (isLoading) {
    return <div>loading,,,...</div>;
  }
  if (error) {
    return <div>error</div>;
  }
  const clickedPhoto = data.loggedUserDetail.savedpost.filter(
    (post: any) => post._id == clickId
  );
  return (
    <div className="mt-10 grid grid-cols-3 gap-2 grid-flow-row">
      {data.loggedUserDetail.savedpost.length > 0 &&
        data.loggedUserDetail.savedpost.map((post: any) => {
          const { _id, url, caption, likes, comment } = post;

          return (
            <div
              key={_id}
              onMouseEnter={() => handleMouseIn(_id)}
              onMouseLeave={() => handleMouseOut(_id)}
              onClick={() => handleImageClick(_id)}
              className="relative"
              style={{
                filter: `${
                  onHover && hoverId === _id
                    ? "brightness(0.7)"
                    : "brightness(1)"
                }`,
              }}
            >
              <img
                src={url}
                alt=""
                className="w-[300px] h-[280px] object-cover"
              />
              {onHover && hoverId === _id && (
                <div
                  style={{ filter: "brightness(1)" }}
                  className="flex gap-6 absolute  top-[40%] left-[35%] transition ease-in-out duration-500"
                >
                  <p className="text-white text-xl ">
                    <span className="text-lg">{likes.length}</span>{" "}
                    <FontAwesomeIcon icon={faHeart} />
                  </p>
                  <p className="text-white text-xl ">
                    <span className="text-lg">{comment.length}</span>{" "}
                    <FontAwesomeIcon icon={faComment} />
                  </p>
                </div>
              )}
            </div>
          );
        })}
      {showPost && (
        <div>
          <div className="bg-gray-800 w-[80vw] h-[85vh] border rounded border-gray-500 fixed top-10 flex  left-36">
            <img
              src={clickedPhoto[0].url}
              alt=""
              className="w-[50vw]   object-cover"
            />
            <div className="py-4  w-full">
              <div className="flex justify-between items-center">
                <div className="flex gap-2 items-center px-4">
                  {data.loggedUser.showProfilePhoto ? (
                    <img
                      src={data.loggedUser.ProfilePhotoUrl}
                      alt=""
                      className="w-[30px] h-[30px] rounded-full object-cover"
                    />
                  ) : (
                    <FontAwesomeIcon icon={faUserCircle} />
                  )}
                  <p className="text-gray-400">{data.loggedUser.username}</p>
                </div>
                <div className="text-gray-400 text-2xl mr-3">
                  <FontAwesomeIcon icon={faEllipsis} />
                </div>
              </div>
              <div className="block h-px w-full mt-3 bg-gray-500"></div>

              <div className="mt-3 text-gray-200 overflow-auto  h-[45vh] px-4">
                <div className="flex gap-2 items-center">
                  <div className="flex gap-2">
                    {data.loggedUser.showProfilePhoto ? (
                      <img
                        src={data.loggedUser.ProfilePhotoUrl}
                        alt=""
                        className="w-[30px] h-[30px] rounded-full object-cover"
                      />
                    ) : (
                      <FontAwesomeIcon icon={faUserCircle} />
                    )}
                    <p className="text-gray-400 text-md">
                      {data.loggedUser.username}
                    </p>
                  </div>
                  <p className=" text-white">{clickedPhoto[0].caption}</p>
                </div>
                <div className="">
                  {clickedPhoto[0].comment.length !== 0 &&
                    clickedPhoto[0].comment.map((item: any) => {
                      const { comment, commentDate } = item;
                      return (
                        <div className="flex gap-1 mt-5" key={commentDate}>
                          {data.loggedUser.showProfilePhoto ? (
                            <img
                              src={data.loggedUser.ProfilePhotoUrl}
                              className="w-[30px] h-[30px] rounded-full object-cover"
                              alt=""
                            />
                          ) : (
                            <FontAwesomeIcon icon={faUserCircle} />
                          )}
                          <p className="text-md text-gray-400 ">
                            {data.loggedUser.username}
                          </p>
                          <p className="">{comment}</p>
                        </div>
                      );
                    })}
                </div>
              </div>
              <div className="bg-gray-600 w-full h-px block mt-2"></div>
              <div className="flex flex-col  justify-between h-[23vh] px-4">
                <div className="mt-3 flex justify-between text-2xl">
                  <div className="flex gap-3 items-center text-white">
                    <p>
                      <FontAwesomeIcon
                        onClick={() => handleLike(clickedPhoto[0]._id)}
                        className=""
                        icon={faHeart}
                      />
                    </p>
                    <p>
                      <FontAwesomeIcon icon={faComment} />
                    </p>
                    <p>
                      <FontAwesomeIcon icon={faArrowUpRightFromSquare} />
                    </p>
                  </div>
                  <div>
                    <p
                      onClick={() => savePost(clickedPhoto[0]._id)}
                      className="text-white"
                    >
                      <FontAwesomeIcon icon={faBookmark} />
                    </p>
                  </div>
                </div>
                <div className="text-gray-300">
                  {clickedPhoto[0].likes.length}{" "}
                  {clickedPhoto[0].likes.length === 1 || 0 ? "like" : "likes"}
                </div>
                <div className="flex gap-2 items-center">
                  <div className="">
                    {data.loggedUser.showProfilePhoto ? (
                      <img
                        src={data.loggedUser.ProfilePhotoUrl}
                        alt=""
                        className="w-[30px] h-[30px] rounded-full object-cover"
                      />
                    ) : (
                      <FontAwesomeIcon icon={faUserCircle} />
                    )}
                  </div>
                  <div className="w-full flex justify-between">
                    <input
                      type="text"
                      className="w-full focus:ring-0 outline-none "
                      placeholder="add a comment"
                      onChange={(e) =>
                        setCommentData((prevVal) => ({
                          ...prevVal,
                          comment: e.target.value,
                        }))
                      }
                    />
                    {commentData.comment.length > 0 && (
                      <button
                        onClick={() => handleComment(clickedPhoto[0]._id)}
                        className="text-blue-500"
                      >
                        Post
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div
            className="fixed top-6 right-10 cursor-pointer text-red-400 text-3xl"
            onClick={() => setShowPost(false)}
          >
            <FontAwesomeIcon icon={faMultiply} />
          </div>
        </div>
      )}
    </div>
  );
}
