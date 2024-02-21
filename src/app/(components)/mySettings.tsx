import React, { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import Link from "next/link";
export default function Settings({ showBox }: any) {
  const router = useRouter();
  const handleLogOut = async () => {
    try {
      await axios.get("/api/users/logout");
      router.push("/login");
    } catch (err: any) {
      console.log(err.message);
    }
  };
  return (
    <div className="fixed top-[30%] left-[40%] bg-gray-700 text-center text-gray-300 rounded-xl w-[30vw] z-20">
      <Link href="/editprofile">
        <p className="p-4 cursor-pointer font-medium">Edit Profile </p>
      </Link>
      <div className="w-full h-px bg-gray-600"></div>
      <Link href="/editprofile/privacy">
        <p className="p-4 cursor-pointer font-medium">Privacy settings</p>
      </Link>
      <div className="w-full h-px bg-gray-600"></div>

      <p className="p-4 cursor-pointer font-medium" onClick={handleLogOut}>
        Log out
      </p>
      <div className="w-full h-px bg-gray-600"></div>
      <p
        className="p-4 cursor-pointer font-medium"
        onClick={() => showBox(false)}
      >
        Cancel
      </p>
    </div>
  );
}
