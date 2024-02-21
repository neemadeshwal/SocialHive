"use client";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserLock } from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";

export default function Forgotpass() {
  const [email, setEmail] = useState("");
  return (
    <div className="dark flex gap-4">
      <div className="form">
        <form>
          <FontAwesomeIcon
            className="text-[5rem] w-full text-center"
            icon={faUserLock}
          />
          <h3 className="text-center w-full mt-4 text-2xl text-yellow-600">
            Trouble Loggin In?
          </h3>
          <p className="text-[0.8rem] tracking-wide text-gray-400 mt-4">
            Enter your email, phone, or username and we will send you a link to
            get back into your account.
          </p>
          <input
            className="mt-5 w-full"
            type="email"
            name="email"
            value={email}
            placeholder="abc@gmail.com"
          />
          <button className="btn">Send Login Link</button>
        </form>
        <p className="w-full text-center mt-3 mb-3 ">Or</p>
        <Link href="/signup">
          <p className="w-full mb-4 transition ease-in-out duration-500 text-gray-400 text-center hover:text-teal-600 font-medium ">
            Create New Account
          </p>
        </Link>
        <hr className="bg-gray-600  border border-gray-600  text-gray-600" />
        <Link href="/login">
          <p className=" transition ease-in-out duration-500 hover:text-yellow-600 block w-full text-center text-gray-400 mt-3  ">
            Back to Login
          </p>
        </Link>
      </div>
    </div>
  );
}
