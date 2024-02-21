import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import EditProfile from "../(components)/editmyprofile";

const queryClient = new QueryClient();
export default function New() {
  return <EditProfile />;
}
