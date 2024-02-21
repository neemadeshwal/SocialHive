import { createContext } from "react";
export const MyGlobalContext = createContext<{
  imgUrl: string;
  setImgUrl: (status: string) => void;
}>({
  imgUrl: "", // set a default value
  setImgUrl: () => {},
});

export const AppProvider = MyGlobalContext.Provider;

export default MyGlobalContext;
