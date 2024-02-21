"use client";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useState } from "react";
export default function Personal() {
  let initialData = {
    firstname: "",
    lastname: "",
    username: "",
  };
  const [formData, setFormData] = useState(initialData);

  const fetchData = async () => {
    try {
      const response = await axios.get("/api/users/myaccount");
      setFormData((prevVal) => ({
        ...prevVal,
        firstname: response.data.response.firstname,
        lastname: response.data.response.lastname,
        username: response.data.response.username,
      }));

      return response.data;
    } catch (err: any) {
      console.log(err.message);
    }
  };
  function handleChange(e: any) {
    const { name, value } = e.target;
    setFormData((prevVal) => ({ ...prevVal, [name]: value }));
  }
  async function handleSaveDetails() {
    try {
      const response = await axios.post("/api/edituser", { formData });
      return response.data;
    } catch (err: any) {
      console.log(err.message);
    }
  }
  const { isLoading, error, data } = useQuery({
    queryKey: ["personal"],
    queryFn: () => fetchData(),
  });
  if (isLoading) {
    return <div> Loading</div>;
  }
  if (error) {
    return <div>Error</div>;
  }

  return (
    <div className="flex justify-center mx-auto">
      <div className="text-gray-400 mt-5 w-[40vw] mx-auto ">
        <h1 className="text-center text-2xl text-gray-200 mb-10">Personal</h1>
        <form onSubmit={(e) => e.preventDefault()}>
          <div className="flex gap-8">
            <div className="">
              <label
                htmlFor="firstname"
                className="text-lg capitalize text-gray-300 tracking-widest"
              >
                firstname
              </label>
              <input
                type="text"
                name="firstname"
                id="firstname"
                placeholder="enter firstname"
                value={formData.firstname}
                onChange={handleChange}
                className="block border-2 border-gray-500 rounded-xl py-4 px-4 mt-3"
              />
            </div>

            <div className="">
              <label
                htmlFor="lastname"
                className="text-lg capitalize text-gray-300 tracking-widest"
              >
                lastname
              </label>
              <input
                type="text"
                name="lastname"
                id="lastname"
                placeholder="enter lastname"
                value={formData.lastname}
                onChange={handleChange}
                className="block border-2 border-gray-500 rounded-xl py-4 px-4 mt-3"
              />
            </div>
          </div>
          <div className="mt-5">
            <label
              htmlFor="username"
              className="text-lg capitalize text-gray-300 tracking-widest"
            >
              username
            </label>
            <input
              type="text"
              name="username"
              id="username"
              placeholder="enter firstname"
              value={formData.username}
              onChange={handleChange}
              className="block border-2 border-gray-500 rounded-xl py-4 px-4 mt-3 w-full"
            />
          </div>
          <div className="mt-6">
            <label
              htmlFor="age"
              className="text-lg capitalize text-gray-300 tracking-widest"
            >
              age
            </label>
            <input
              type="number"
              name="age"
              id="age"
              placeholder=""
              className="block border-2 border-gray-500 rounded-xl py-4 px-4 mt-3 w-[0%]"
            />
          </div>

          <button onClick={handleSaveDetails} className="btn mt-12">
            save
          </button>
        </form>
      </div>
    </div>
  );
}
