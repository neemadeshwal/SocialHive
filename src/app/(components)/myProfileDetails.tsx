"use client";
import {
  faGear,
  faUser,
  faUserCircle,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import { useRouter } from "next/navigation";
import MySettings from "./mySettings";

export default function MyProfileDetails({ params }: any) {
  const router = useRouter();
  const [showProfileChange, setProfileChange] = useState(false);
  const [showSettings, setShowSettings] = useState(false);

  const dialogBox = useRef(null);
  const { isLoading, error, data } = useQuery({
    queryKey: ["loggedUser"],
    queryFn: () => getLoggedUserInfo(),
  });
  const [showProfilePhoto, setShowProfilePhoto] = useState(false);
  const [imgUrl, setImgUrl] = useState("");

  function handleSettings(value: any) {
    setShowSettings(value);
  }
  const getLoggedUserInfo = async () => {
    try {
      const response = await axios.get("/api/users/myaccount");
      // const response2=await axios.get("/api/userdetail/myaccount")

      return response.data;
    } catch (err: any) {
      console.log(err.message);
    }
  };

  useEffect(() => {
    if (data?.response?.showProfilePhoto !== undefined) {
      setShowProfilePhoto(data.response.showProfilePhoto);
      setImgUrl(data.response.ProfilePhotoUrl);
      console.log(data.response);
    }
  }, [data?.response?.showProfilePhoto, showProfilePhoto]);
  async function handleRemovePhoto() {
    try {
      const response = await axios.get("/api/removeprofilephoto");

      const { showUserPhoto } = response.data;
      setProfileChange(showUserPhoto);

      router.refresh();

      console.log("success");
    } catch (err: any) {
      console.log(err.message);
    }
  }
  if (isLoading) {
    return <div className="">Loading.....</div>;
  }
  if (error) {
    return <div className="">Error....</div>;
  }
  console.log(data);
  return (
    <div className="text-white flex  gap-20 px-14 z-20   ">
      {showProfileChange && (
        <div
          ref={dialogBox}
          className=" dialog rounded-lg bg-gray-700 w-[33vw] fixed top-[30%] left-[35%] text-center backdrop-brightness-125 brightness-100"
        >
          <p
            style={{ filter: "brightness(1)" }}
            className="text-gray-200 text-xl my-6 brightness-100 backdrop-brightness-100"
          >
            Change profile photo
          </p>
          <Link href={`${data.response.username}/uploadphoto`}>
            <div className="bg-gray-500 w-full h-px"></div>
            <p
              style={{ filter: "brightness(1)" }}
              className="text-blue-400 text-md font-medium my-4"
            >
              Upload Photo
            </p>
          </Link>

          <div className="bg-gray-500 w-full h-px"></div>

          {data.response.showProfilePhoto && (
            <>
              <p
                onClick={handleRemovePhoto}
                className="text-pink-500 cursor-pointer text-md font-medium my-4"
              >
                Remove current photo
              </p>
              <div className="bg-gray-500 text-md w-full h-px"></div>
            </>
          )}

          <p
            className="my-4 cursor-pointer"
            onClick={() => setProfileChange(false)}
          >
            Cancel
          </p>
        </div>
      )}
      <div onClick={() => setProfileChange(true)}>
        {/* data.response.showProfilePhoto */}
        {data.response.showProfilePhoto ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={data.response.ProfilePhotoUrl}
            alt=""
            className="w-[150px] h-[150px] rounded-full object-cover"
          />
        ) : (
          <FontAwesomeIcon className="text-[10rem]" icon={faUserCircle} />
        )}
      </div>

      <div className="mt-4">
        <div className="flex gap-4 items-center">
          <h3 className="text-2xl">{data.response.username}</h3>
          <p onClick={() => setShowSettings(true)}>
            <FontAwesomeIcon icon={faGear} />
          </p>
        </div>
        <div className="flex gap-4 mt-4">
          <p>{1} post</p>
          <p>{data.userdetail.follower.length} followers</p>
          <p>{data.userdetail.following.length} following</p>
        </div>
        <div className="mt-4">
          <p className="text-lg font-medium text-gray-400">
            {data.response.firstname} {data.response.lastname}
          </p>
          <p className="mt-3">{data.userdetail.bio}</p>
        </div>
      </div>
      {showSettings && <MySettings showBox={handleSettings} />}
    </div>
  );
}
