/* eslint-disable @next/next/no-img-element */
"use client";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserCircle } from "@fortawesome/free-solid-svg-icons";
export default function EditProfile() {
  let initialData = {
    bio: "",
    gender: "",
  };
  const [editData, setEditData] = useState(initialData);

  const { isLoading, error, data } = useQuery({
    queryKey: ["editmyprofile"],
    queryFn: () => fetchData(),
  });
  async function fetchData() {
    try {
      const response = await axios.get("/api/users/myaccount");
      setEditData((prevVal) => ({
        ...prevVal,
        bio: response.data.response.bio,
        gender: response.data.response.gender,
      }));

      return response.data;
    } catch (err: any) {
      console.log(err.message);
    }
  }
  function handleChange(e: any) {
    const { name, value } = e.target;
    console.log(name, value);
    setEditData((prevVal) => ({ ...prevVal, [name]: value }));
  }
  async function handleSaveDetails() {
    try {
      const response = await axios.post("/api/users/editprofile", { editData });
      return response.data;
    } catch (err: any) {
      console.log(err.message);
    }
  }
  if (isLoading) {
    return <div>Loading.....</div>;
  }
  if (error) {
    return <div>Error....</div>;
  }
  console.log(data);

  return (
    <div className="text-gray-300 w-[40vw] mx-auto">
      <h2 className="text-center text-3xl mt-4 my-8 ">Edit profile</h2>
      <div className="flex justify-between items-center  mx-auto mt-10 p-4 px-5 bg-gray-900 rounded-xl w-[90%]">
        <div className="flex gap-3">
          {data.response.showProfilePhoto ? (
            <img
              className="w-[60px] h-[60px] rounded-full object-cover"
              src={data.response.ProfilePhotoUrl}
              alt=""
            />
          ) : (
            <FontAwesomeIcon className="text-4xl" icon={faUserCircle} />
          )}

          <div>
            <div className="">{data.response.username}</div>
            <div className="text-gray-500">
              {data.response.firstname} {data.response.lastname}
            </div>
          </div>
        </div>
        <div className="text-white px-4 py-2 rounded-lg bg-blue-500 hover:bg-blue-600">
          change photo
        </div>
      </div>
      <div className="mt-10   mx-auto">
        <label htmlFor="bio" className="text-xl mb-8 ml-10">
          Bio
        </label>
        <input
          className="block w-[90%] mx-auto  border-2 border-gray-500 py-5 rounded-xl mt-4"
          type="text"
          name="bio"
          id="bio"
          value={editData.bio}
          onChange={handleChange}
          placeholder="what you think of yourself??"
        ></input>
      </div>
      <div className="mt-5  mx-auto">
        <label className="text-xl ml-9 " htmlFor="gender">
          Gender
        </label>
        <select
          value={editData.gender}
          onChange={handleChange}
          name="gender"
          id="gender"
          className="block mt-4 w-[90%] mx-auto  bg-gray-800 border-2 border-gray-500 py-4 rounded-xl px-5 text-xl text-gray-400"
        >
          <option id="female" className="">
            female
          </option>
          <option id="male">male</option>
          <option id="others">prefer not to say</option>
        </select>
      </div>
      <button onClick={handleSaveDetails} className="btn w-[90%]  ml-7 ">
        Save
      </button>
    </div>
  );
}
