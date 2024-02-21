/* eslint-disable @next/next/no-img-element */
import {
  faCheckCircle,
  faMultiply,
  faUserCircle,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import axios from "axios";
import Link from "next/link";

export default function SwitchMyAccount({ userData }: any) {
  const [showFirstBox, setShowFirstBox] = useState(true);
  const [showLoginBox, setShowLoginBox] = useState(false);

  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  function handleLoginToExistingAccount() {
    setShowLoginBox(true);
    setShowFirstBox(false);
  }

  async function handleLogin() {
    try {
      const response = await axios.post("/api/user/login", user);
    } catch (err: any) {
      console.log(err.message);
    }
  }
  return (
    <div>
      {showFirstBox && (
        <div className="fixed top-[30%] left-[35%] w-[28vw] h-[40vh] rounded-xl text-gray-200 bg-gray-700">
          <div className="flex p-3 justify-center">
            <p className="capitalize text-center font-medium">
              switch accounts
            </p>
          </div>
          <div className="w-full h-px bg-gray-600"></div>
          <div className="flex flex-col justify-between h-[70%]">
            <div className="flex justify-between p-4 items-center">
              <div className="flex gap-4 items-center">
                <div>
                  {userData.showProfilePhoto ? (
                    <img
                      src={userData.ProfilePhotoUrl}
                      className="rounded-full w-[50px] h-[50px] items-center object-cover"
                      alt=""
                    />
                  ) : (
                    <FontAwesomeIcon className="text-2xl" icon={faUserCircle} />
                  )}
                </div>
                <p className="text-lg">{userData.username}</p>
              </div>
              <FontAwesomeIcon className="text-3xl" icon={faCheckCircle} />
            </div>
            <div
              onClick={handleLoginToExistingAccount}
              className="text-blue-400 text-center text-md cursor-pointer font-sans hover:text-gray-400"
            >
              Log in to existing account
            </div>
          </div>
        </div>
      )}
      {showLoginBox && (
        <div className="fixed top-[28%] left-[35%] w-[28vw] h-[60vh] rounded-xl text-gray-200 bg-gray-700">
          <div className="text-5xl text-center logo mt-5 text-yellow-600 tracking-wider">
            Social hive
          </div>
          <div className=" mt-10 flex flex-col gap-4 items-center w-[75%] mx-auto">
            <input
              className="w-full"
              name="email"
              id="email"
              value={user.email}
              placeholder="enter email address"
            />
            <input
              className="w-full"
              name="password"
              id="password"
              placeholder="enter password"
              value={user.password}
            />
            <button className="btn" onClick={handleLogin}>
              Log In
            </button>
            <Link href="/forgotpass">
              <button>forgot password?</button>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
