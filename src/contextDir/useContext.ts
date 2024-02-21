// "use client";

import { MyGlobalContext } from "./globalContext";
import { useContext } from "react";

const useGlobalContext = () => {
  const context = useContext(MyGlobalContext);

  if (!context) {
    throw new Error("Please us this in the parent component");
  }

  return context;
};

export default useGlobalContext;
