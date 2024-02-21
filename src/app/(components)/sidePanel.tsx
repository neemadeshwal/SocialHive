"use client";
import LeftSidePanel from "../(components)/LeftSidePanel";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5,
    },
  },
});
export default function Dashboard({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <QueryClientProvider client={queryClient}>
      <div className="bg-gray-800 w-full min-h-[100vh]">
        <div className="w-[95vw] m-auto    gap-20 flex justify-between">
          <div className="flex gap-10">
            <div className=" w-[20vw] flex gap-6  ">
              <div className="w-[18vw] pt-10 fixed left-5 h-[100vh] ">
                <LeftSidePanel />
              </div>
              <div className="w-px bg-gray-600 fixed left-72 h-full block"></div>
            </div>
            <div>{children}</div>
          </div>
        </div>
      </div>
    </QueryClientProvider>
  );
}
