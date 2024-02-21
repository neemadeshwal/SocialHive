"use client";
import { useState } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPerson,
  faPersonCirclePlus,
  faUser,
  faUserCircle,
} from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";
import UploadButtonPage from "./uploadButton";
type User = {
  _id: string;
  username: string;
  email: string;
  showProfilePhoto: boolean;
  ProfilePhotoUrl: string;
};
export default function UserAccount({ user }: { user: User }) {
  const { _id, email, username, showProfilePhoto, ProfilePhotoUrl } = user;
  const [file, setFile] = useState();
  function handleImageChange(e: any) {
    setFile(e.target.files[0]);
  }
  async function handleImageUpload() {
    try {
      console.log("hellpw");
      const formData = new FormData();
      formData.append("image", file);

      console.log(formData.get("image"));
      const response = await axios.post(
        `/api/users/imgupload/${_id}`,
        formData,
        {
          headers: {
            "Content-type": "multipart/form-data",
          },
        }
      );
    } catch (err: any) {
      console.log(err.message);
    }
  }
  return (
    <div key={_id} className="flex mt-6 justify-between w-full">
      <Link href={`/${username}`}>
        <div className="flex gap-6 items-center">
          <div>
            <div>
              {showProfilePhoto ? (
                <img
                  src={ProfilePhotoUrl}
                  alt=""
                  className="w-[45px] h-[45px] rounded-full object-cover"
                />
              ) : (
                <FontAwesomeIcon
                  className="text-3xl text-gray-200"
                  icon={faUserCircle}
                />
              )}
            </div>
          </div>
          <div>
            <p className="text-gray-200 font-lg tracking-wider capitalize">
              {username}
            </p>
          </div>
        </div>
      </Link>
      <div>
        <button className="text-[0.8rem] text-blue-300 mt-3 hover:text-gray-200">
          Follow
        </button>
      </div>
    </div>
  );
}
