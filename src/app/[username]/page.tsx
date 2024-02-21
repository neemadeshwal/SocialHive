"use client";
import { useEffect, useState } from "react";
import DiffUserAccount from "../(components)/diffuseraccount";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import SidePanel from "../(components)/sidePanel";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5,
    },
  },
});

export default function User({ params }: any) {
  const user = params.username;

  return (
    <QueryClientProvider client={queryClient}>
      <SidePanel>
        <div>
          <DiffUserAccount user={user} />
        </div>
      </SidePanel>
    </QueryClientProvider>
  );
}
