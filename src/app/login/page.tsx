"use client";
import { useState } from "react";
import Image from "next/image";
import LoginImageIcon from "/public/assets/login.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";
import { useRouter } from "next/navigation";
import axios from "axios";

export default function Login() {
  const router = useRouter();
  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);

  function handleChange(e: any) {
    const { name, value } = e.target;
    setUser((prevVal) => ({ ...prevVal, [name]: value }));
  }
  function handleShowPassword() {
    setShowPassword((prevVal) => !prevVal);
  }
  const handleLogin = async () => {
    try {
      const response = await axios.post("/api/users/login", user);
      console.log({ success: true, message: "Login successful", response });
      router.push("/");
    } catch (err: any) {
      console.log(err.message);
    }
  };
  return (
    <div className="dark flex gap-4">
      <div className="flex justify-center w-1/2">
        <Image
          src={LoginImageIcon}
          alt=""
          width={400}
          height={400}
          className="object-cover"
          priority={true}
        />
      </div>
      <div className="w-1/2">
        <div className="form">
          <form onSubmit={(e) => e.preventDefault()}>
            <h3 className="text-4xl text-center text-yellow-600 tracking-wider">
              SocialHive
            </h3>
            <p className="text-lg mt-6 text-gray-400">Login to continue</p>
            <input
              type="email"
              name="email"
              value={user.email}
              placeholder="abz@gmail.com"
              id="email"
              onChange={handleChange}
              className="w-full mt-4"
            />
            <div className="relative">
              <div
                className="absolute right-5 top-[45%] text-gray-500 cursor-pointer"
                onClick={handleShowPassword}
              >
                {showPassword ? (
                  <FontAwesomeIcon icon={faEyeSlash} />
                ) : (
                  <FontAwesomeIcon icon={faEye} />
                )}
              </div>
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                value={user.password}
                placeholder="password"
                id="password"
                onChange={handleChange}
                className="mt-4 w-full"
              />
            </div>
            <button className="btn" onClick={handleLogin}>
              Login
            </button>
          </form>
          <Link href="/forgotpass">
            <button className="mt-4 text-center font-medium tracking-wider w-full hover:text-teal-500 transition ease-in-out duration-500">
              Forgot Password?
            </button>
          </Link>
          <p className="mt-8 text-center tracking-wider">
            Donot have an account?
            <span className="text-blue-400 font-medium">
              <Link href="/signup">SignUp</Link>
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}
