"use client";
import {
  QueryClientProvider,
  useQuery,
  QueryClient,
} from "@tanstack/react-query";
import axios from "axios";
import { useEffect, useState } from "react";
import AccountDetails from "./(components)/accountsDetail";
import LeftSidePanel from "./(components)/LeftSidePanel";
import Home from "./(components)/home";
import SidePanel from "./(components)/sidePanel";
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5,
    },
  },
});
export default function Page() {
  return (
    <QueryClientProvider client={queryClient}>
      <SidePanel>
        <Home />
      </SidePanel>
    </QueryClientProvider>
  );
}
