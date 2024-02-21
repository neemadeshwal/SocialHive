/* eslint-disable @next/next/no-img-element */
"use client";
import {
  faUserCircle,
  faUser,
  faMultiply,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import FeatureData from "@/features";
import { useState } from "react";
import SwitchMyAccount from "./switchmyaccount";

type Profile = {
  _id: string;
  username: string;
  email: string;
  showProfilePhoto: Boolean;
  ProfilePhotoUrl: string;
  firstname: string;
  lastname: string;
};
// myProfile
export default function MyProfile({ myProfile }: { myProfile: Profile }) {
  const {
    _id,
    username,
    email,
    showProfilePhoto,
    ProfilePhotoUrl,
    firstname,
    lastname,
  } = myProfile;

  const [isSwitchAccountBoxOpen, setIsSwitchAccountBoxOpen] = useState(false);
  return (
    <div key={_id} className="flex justify-between items-center">
      <div className="flex gap-1 items-center">
        <Link
          href={`/myaccount/${username}`}
          className="flex gap-3 items-center"
        >
          {showProfilePhoto ? (
            <img
              src={ProfilePhotoUrl}
              alt=""
              className="w-[45px] h-[45px] rounded-full object-cover"
            />
          ) : (
            <FontAwesomeIcon
              className="text-gray-300 text-3xl "
              icon={faUserCircle}
            />
          )}
          <div className="flex gap-3 items-center"></div>
        </Link>
        <div>
          <p className="text-[1rem] text-gray-300 mb-0 pb-0">{username}</p>
          <p className="text-gray-500 mt-0 text-[0.9rem] pt-0">
            {firstname} {lastname}
          </p>
        </div>
      </div>
      <div>
        <button
          onClick={() => setIsSwitchAccountBoxOpen(true)}
          className="text-[0.8rem] tracking-wider hover:text-gray-400 text-blue-300"
        >
          Switch
        </button>
        {isSwitchAccountBoxOpen && (
          <div>
            <SwitchMyAccount userData={myProfile} />
            <FontAwesomeIcon
              onClick={() => setIsSwitchAccountBoxOpen(false)}
              className="fixed left-[60vw] top-[14.5vw] text-2xl text-gray-300 cursor-pointer"
              icon={faMultiply}
            />
          </div>
        )}
      </div>
    </div>
  );
}
