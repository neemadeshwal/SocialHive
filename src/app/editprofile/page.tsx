// import SidePanel from "@/app/(components)/sidePanel";
// import EditMyProfile from "@/app/(components)/editmyprofile";
// import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
// const queryClient = new QueryClient({
//   defaultOptions: {
//     queries: {
//       staleTime: 1000 * 60 * 5,
//     },
//   },
// });
// export default function EditProfile() {
//   return (
//     <SidePanel>
//       <QueryClientProvider client={queryClient}>
//         <EditMyProfile />
//       </QueryClientProvider>
//     </SidePanel>
//   );
// }
import EditMyProfile from "../(components)/editmyprofile";
import SidePanel from "../(components)/sidePanel";
export default function EditProfile() {
  return <EditMyProfile />;
}
