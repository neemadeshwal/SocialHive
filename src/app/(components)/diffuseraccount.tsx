import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTableCells,
  faTableCellsLarge,
  faImagePortrait,
  faUserCircle,
  faGear,
} from "@fortawesome/free-solid-svg-icons";
export default function UserAccount({ user }: any) {
  const fetchData = async () => {
    try {
      const response = await axios.get(`/api/otheruser?user=${user}`);
      return response.data;
    } catch (err: any) {
      console.log(err);
    }
  };
  const handleFollow = async () => {
    try {
      const response = await axios.post(`/api/follow?user=${user}`);
      return response.data;
    } catch (err) {
      console.log(err);
    }
  };

  const handleUnfollow = async () => {
    try {
      const response = await axios.post(`/api/unfollow?user=${user}`);
      console.log(response.data);
      return response.data;
    } catch (err: any) {
      console.log(err.message);
    }
  };
  const { isLoading, error, data } = useQuery({
    queryKey: ["otheruser"],
    queryFn: () => fetchData(),
  });
  if (data) {
    console.log(data);
  }

  if (isLoading) {
    return <div>Loading......</div>;
  }
  if (error) {
    return <div>an error occured.....</div>;
  }

  return (
    <div className="w-[70vw] mt-10 ">
      <div className="w-[90%] m-auto">
        <div className="mt-10">
          <div className="text-white flex  gap-20 px-14 z-20   ">
            {/* data.response.showProfilePhoto */}
            {data.user.showProfilePhoto ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={data.user.ProfilePhotoUrl}
                alt=""
                className="w-[150px] h-[150px] rounded-full object-cover"
              />
            ) : (
              <FontAwesomeIcon className="text-[10rem]" icon={faUserCircle} />
            )}

            <div className="mt-4">
              <div className="flex gap-4 items-center">
                <h3 className="text-2xl">{data.user.username}</h3>
                {data.userdetail.follower.includes(data.loggedUserID) ? (
                  <button
                    className="bg-gray-600 text-gray-300 rounded-md px-4 py-[0.28rem] transition ease-in-out duration-500 "
                    onClick={handleUnfollow}
                  >
                    Unfollow
                  </button>
                ) : (
                  <button
                    onClick={handleFollow}
                    className="rounded-md px-4 py-[0.28rem] bg-blue-500 hover:bg-blue-600 transition ease-in-out duration-500 text-white font-medium"
                  >
                    Follow
                  </button>
                )}
              </div>
              <div className="flex gap-4 mt-4">
                <p>1 post</p>
                <p>{data.userdetail.follower.length} followers</p>
                <p>{data.userdetail.following.length} following</p>
              </div>
              <div className="mt-4">
                <p className="text-lg font-medium">
                  {data.user.firstname} {data.user.lastname}
                </p>
                <p>bio</p>
              </div>
            </div>
          </div>
          <div className="w-full h-px bg-gray-500 mt-12"></div>
          <nav className="flex gap-14 text-gray-300 text-xl mt-5 justify-center ">
            <div className="flex gap-2 items-center">
              <FontAwesomeIcon icon={faTableCellsLarge} />
              <p>Post</p>
            </div>

            <div className="flex gap-2 items-center">
              <FontAwesomeIcon icon={faImagePortrait} />
              <p>Tagged</p>
            </div>
          </nav>
        </div>
      </div>
    </div>
  );
}
