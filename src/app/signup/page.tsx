"use client";
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import img from "/public/assets/signup-2.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import { useRouter } from "next/navigation";
export default function Signup() {
  const router = useRouter();
  const [user, setUser] = useState({
    firstname: "",
    lastname: "",
    email: "",
    password: "",
    username: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setUser((prevVal) => ({ ...prevVal, [name]: value }));
  };

  function handleShowPassword() {
    setShowPassword((prevVal) => !prevVal);
  }

  const handleSignUp = async () => {
    try {
      const response = await axios.post("/api/users/signup", user);
      setLoading(true);
      console.log({ success: true, message: "Account created", response });
      router.push("/login");
    } catch (err: any) {
      console.log(err.message);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="dark flex  gap-4">
      <div className="flex justify-center w-1/2">
        <Image
          className="object-cover"
          src={img}
          alt=""
          width={400}
          height={300}
          priority={true}
        />
      </div>
      <div className="w-1/2">
        <div className="form  ">
          <form onSubmit={(e) => e.preventDefault()} className="w-full">
            <h3 className="text-4xl tracking-wide mb-6">Signup</h3>
            <div className="mt-3 flex w-full gap-5 ">
              <input
                className="w-1/2"
                type="text"
                name="firstname"
                id="firstname"
                onChange={handleChange}
                value={user.firstname}
                placeholder="first name"
              />
              <input
                className="w-1/2 "
                type="text"
                name="lastname"
                id="lastname"
                onChange={handleChange}
                value={user.lastname}
                placeholder="last name"
              />
            </div>
            <input
              className="w-full mt-4 bg-gray-800 "
              type="text"
              name="username"
              id="username"
              onChange={handleChange}
              value={user.username}
              placeholder="username"
            />
            <input
              className="w-full mt-4 bg-gray-800 "
              type="email"
              name="email"
              id="email"
              onChange={handleChange}
              value={user.email}
              placeholder="abc@gmail.com"
            />
            <div className="relative">
              <div
                onClick={handleShowPassword}
                className="absolute right-5 top-[45%] text-gray-500 cursor-pointer transition ease-in-out duration-500"
              >
                {showPassword ? (
                  <FontAwesomeIcon icon={faEyeSlash} />
                ) : (
                  <FontAwesomeIcon icon={faEye} />
                )}
              </div>
              <input
                className="w-full mt-4"
                type={showPassword ? "text" : "password"}
                name="password"
                id="password"
                onChange={handleChange}
                value={user.password}
                placeholder="password"
              />
            </div>
            <button
              className={`btn ${loading && "animate-spin"}`}
              onClick={handleSignUp}
            >
              Create
            </button>
          </form>

          <p className="mt-8 text-center tracking-wider ">
            Have an account?
            <Link href="/login">
              <span className="text-blue-400">LogIn</span>
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
