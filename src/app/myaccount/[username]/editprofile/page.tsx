"use client";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserCircle } from "@fortawesome/free-solid-svg-icons";
export default function EditProfile() {
  // const [editData, setEditData] = useState({});
  const { isLoading, error, data } = useQuery({
    queryKey: ["editmyprofile"],
    queryFn: () => fetchData(),
  });
  async function fetchData() {
    try {
      console.log("hello");
      const response = await axios.get("/api/users/myaccount");
      console.log("hello again");
      console.log(response.data);
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
  return <div>hello</div>;

  // return (
  //   <div className="text-white">
  //     <p>Edit profile</p>
  //     <div>
  //       {data.response.showProfilePhoto ? (
  //         <img src={data.response.ProfilePhotoUrl} alt="" />
  //       ) : (
  //         <FontAwesomeIcon icon={faUserCircle} />
  //       )}

  //       <div>
  //         <div className="">{data.response.username}</div>
  //         <div className="">
  //           {data.response.firstname} {data.response.lastname}
  //         </div>
  //       </div>
  //       <div className="text-white px-4 py-2 rounded-lg bg-blue-500 hover:bg-blue-600">
  //         change photo
  //       </div>
  //     </div>
  //   </div>
  // );
}
