"use client";
// import LeftSidePanel from "../(components)/LeftSidePanel";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  useQuery,
  QueryClientProvider,
  QueryClient,
} from "@tanstack/react-query";
import {
  faBookmark,
  faBox,
  faImagePortrait,
  faRibbon,
  faTableCellsLarge,
} from "@fortawesome/free-solid-svg-icons";
import MyProfileDetails from "../../(components)/myProfileDetails";
import axios from "axios";
import MyPost from "@/app/(components)/mypost";
import Link from "next/link";
// import { useRouter } from "next/router";
import { usePathname } from "next/navigation";

// const queryClient = new QueryClient({
//   defaultOptions: {
//     queries: {
//       staleTime: 1000 * 60 * 5,
//     },
//   },
// });

export default function MyProfile({ params, children }: any) {
  const page = usePathname();
  console.log(page);
  return <MyPost />;
  // return (
  //   <QueryClientProvider client={queryClient}>
  //     <div className="w-[70vw] mt-10 ">
  //       <div className="w-[90%] m-auto">
  //         <MyProfileDetails />
  //         <div className="mt-10">
  //           <div className=" bg-gray-600  h-px w-full block"></div>

  //           <nav className="flex gap-14 text-gray-300 text-xl mt-3 justify-center">
  //             <Link href={`${params.username}`}>
  //               <div className="flex gap-2 items-center">
  //                 <FontAwesomeIcon icon={faTableCellsLarge} />

  //                 <p>Post</p>
  //               </div>
  //             </Link>
  //             <Link href={`/myaccount/${params.username}/saved`}>
  //               <div className="flex gap-2 items-center">
  //                 <FontAwesomeIcon icon={faBookmark} />
  //                 <p>Saved</p>
  //               </div>
  //             </Link>
  //             <Link href={`tagged`}>
  //               <div className="flex gap-2 items-center">
  //                 <FontAwesomeIcon icon={faImagePortrait} />
  //                 <p>Tagged</p>
  //               </div>
  //             </Link>
  //           </nav>
  //           {/* <MyPost /> */}
  //           {children}
  //         </div>
  //       </div>
  //     </div>
  //   </QueryClientProvider>
  // );
}
