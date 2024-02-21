"use client";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import LoadingGif from "/public/assets/loading2.gif";
import Image from "next/image";
import UserAccount from "@/app/(components)/userAccount";
import MyProfile from "./myProfile";
import Link from "next/link";

export default function Accounts() {
  const { isLoading, error, data } = useQuery({
    queryKey: ["user"],
    queryFn: () => dataFetch(),
  });

  const dataFetch = async () => {
    try {
      const response = await axios.get("/api/users/accounts");
      return response.data;
    } catch (err: any) {
      console.log(err.message);
    }
  };
  if (isLoading) {
    return (
      <div className="dark">
        <Image src={LoadingGif} alt="" width={100} height={100} />
      </div>
    );
  }
  if (error) {
    return <h2>An error occured</h2>;
  }
  console.log(data.loggedUser);
  return (
    <div className=" w-full">
      <MyProfile myProfile={data.loggedUser} />
      <div className="flex justify-between items-center text-gray-400 mt-10">
        <p>Suggested for you</p>
        <Link href="explore/people">
          <p className="text-gray-400 text-[0.9rem] hover:text-gray-100">
            See all
          </p>
        </Link>
      </div>

      <div>
        {data.allUsers.slice(0, 5).map((user: any) => {
          return <UserAccount key={user._id} user={user} />;
        })}
      </div>
    </div>
  );
}
