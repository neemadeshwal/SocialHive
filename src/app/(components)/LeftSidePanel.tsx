"use client";
import FeatureData from "@/features";
import {
  faArrowLeft,
  faCross,
  faImage,
  faMultiply,
  faSlash,
  faUserCircle,
  faVideo,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import UploadPost from "./uploadPost";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
type Features = {
  id: string;
  title: string;
  icon: any;
};
import Link from "next/link";
import { useEffect, useState } from "react";
export default function LeftSidePanel() {
  const [showbox, setShowBox] = useState(false);
  const [showNextBox, setShowNextBox] = useState(false);
  const [showCaptionBox, setShowCaptionBox] = useState(false);
  const [file, setFile] = useState([]);
  const [user, setUser] = useState(null);
  const [postData, setPostData] = useState({
    postUrl: "",
    caption: "",
  });

  const { isLoading, error, data } = useQuery({
    queryKey: ["createpost"],
    queryFn: () => dataFetch(),
  });

  const dataFetch = async () => {
    try {
      const response = await axios.get("/api/users/myaccount");

      return response.data;
    } catch (err: any) {
      console.log(err);
    }
  };

  const fileData = (data: any) => {
    setFile(data);
    setShowBox(false);
    setShowNextBox(true);
    setPostData((prevVal) => ({ ...prevVal, postUrl: data.url }));
  };

  // useEffect(() => {
  //   if (file.length === 0) {
  //     setShowBox(true);
  //     setShowNextBox(false);
  //     setShowCaptionBox(false);
  //   } else {
  //     setShowBox(false);
  //     setShowNextBox(true);
  //   }
  // }, [file]);

  function backToBoxOne() {
    setShowBox(true);
    setShowNextBox(false);
  }
  function backToBoxTwo() {
    setShowNextBox(true);
    setShowCaptionBox(false);
  }
  function handleCaption(e: any) {
    setPostData((prevVal) => ({ ...prevVal, caption: e.target.value }));
  }

  async function handleCaptionBox() {
    setShowCaptionBox(true);
  }

  const sharePost = async () => {
    try {
      const response = await axios.post("/api/newpost", { postData });
      setShowBox(false);
      setShowCaptionBox(false);
      setShowNextBox(false);
    } catch (err: any) {
      console.log(err.any);
    }
  };
  if (isLoading) {
    return <div>Loading.....</div>;
  }

  if (error) {
    return <div>error</div>;
  }
  console.log(data);

  return (
    <div>
      <h3 className="logo text-4xl  font-bold text-gray-100 tracking-widest mb-10">
        SocialHive
      </h3>
      {FeatureData.map((feature: Features) => {
        const { id, icon, title } = feature;

        return (
          <div
            className="flex  gap-5 text-xl hover:text-[1.4rem] capitalize text-gray-300 transition ease-in-out duration-700 items-center px-4 py-3 mt-5 cursor-pointer rounded-lg hover:bg-gray-700"
            key={id}
          >
            <Link
              href={`${
                title === "home" ? "/" : title === "create" ? "/" : `/${title}`
              }`}
            >
              <div
                className="flex gap-3 items-center"
                onClick={() => setShowBox(true)}
              >
                <div>
                  <FontAwesomeIcon className="" icon={icon} />
                </div>

                <div className="text-lg">{title}</div>
              </div>
            </Link>
          </div>
        );
      })}
      {showbox && (
        <>
          <div className="bg-gray-700 rounded-lg w-[30vw] h-[70vh] text-gray-100 fixed top-[20%] left-[35%]">
            <p className="mt-2 text-lg mb-2 text-center font-semibold text-gray-300">
              Create new post
            </p>

            <div className="bg-gray-400 h-px w-full block"></div>
            <div className="text-4xl mt-14 text-gray-200 text-center flex gap-3 justify-center">
              <FontAwesomeIcon icon={faImage} />
              <p>/</p>
              <FontAwesomeIcon icon={faVideo} />
            </div>

            <p className="text-gray-100 text-center mt-2 text-xl">
              Drag photos and videos here.
            </p>
            <UploadPost fileData={fileData} />
          </div>
          <div
            className=" fixed top-[1%]  right-3 text-gray-100 font-normal text-4xl "
            onClick={() => setShowBox(false)}
          >
            <FontAwesomeIcon icon={faMultiply} />
          </div>
        </>
      )}

      {showNextBox && (
        <div
          className={`bg-gray-700 rounded-lg  ${
            showCaptionBox
              ? "w-[55vw] left-[20%] h-[70vh] "
              : "w-[30vw] left-[35%] h-[70vh]"
          } transition ease-in-out duration-500 text-gray-100 fixed top-[20%] `}
        >
          <div className=" mx-6 mt-2">
            {showCaptionBox ? (
              <div className="flex justify-between">
                <p onClick={backToBoxTwo} className="text-2xl">
                  <FontAwesomeIcon icon={faArrowLeft} />
                </p>
                <p>Create new post</p>
                <button className="text-blue-400" onClick={sharePost}>
                  Share
                </button>
              </div>
            ) : (
              <div className="flex justify-between">
                <p onClick={backToBoxOne} className="text-2xl">
                  <FontAwesomeIcon icon={faArrowLeft} />
                </p>
                <div className="">
                  <p onClick={handleCaptionBox} className="cursor-pointer">
                    Next
                  </p>
                </div>
              </div>
            )}
          </div>
          <div className={`${showCaptionBox && "flex"}`}>
            <div
              style={{
                background: `url(${
                  file.length !== 0
                    ? file.url
                    : "https://img.freepik.com/free-photo/deep-blue-plain-concrete-textured-background_53876-103890.jpg"
                })`,
                backgroundSize: "30vw 60vh",
                backgroundRepeat: "none",
              }}
              className=" w-[30vw] h-[60vh] block"
            ></div>
            {showCaptionBox && (
              <div className="mx-6 my-4">
                <div className=" flex gap-2 items-center">
                  <div className="">
                    {data.response.showProfilePhoto ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={data.response.ProfilePhotoUrl}
                        className="w-[60px] h-[60px] object-cover rounded-full"
                        alt=""
                      />
                    ) : (
                      <div className="text-3xl">
                        <FontAwesomeIcon icon={faUserCircle} />
                      </div>
                    )}
                  </div>

                  <div className="ml-2 text-md ">{data.response.username}</div>
                </div>
                <div className="mt-5">
                  <textarea
                    name="caption"
                    id="caption"
                    onChange={handleCaption}
                    cols={30}
                    rows={10}
                    placeholder="enter your caption here"
                    className=" text-gray-200 bg-transparent border-0 outline-none focus:ring-0 w-full"
                  ></textarea>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
