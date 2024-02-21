import { useQuery } from "@tanstack/react-query";
import axios from "axios";
export default function ShowAllPost() {
  const fetchData = async () => {
    try {
      const response = await axios.get("/api/getallpost");
      return response.data;
    } catch (err: any) {
      console.log(err.message);
    }
  };
  const { isLoading, error, data } = useQuery({
    queryKey: ["showallpost"],
    queryFn: () => fetchData(),
  });
  if (isLoading) {
    return <div>loading.....</div>;
  }
  if (error) {
    return <div>Error</div>;
  }
  console.log(data);
  return <h1>hello</h1>;
  // return <div>
  //   {data.allPost((post:any)=>{
  //     const {_id,url,likes,tagged,author,comment,caption ,createdAt}=post

  //     return(
  //       <div>

  //       </div>
  //     )

  //   })}
  // </div>;
}
