"use client";

import * as React from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "sonner";
import Navbar from "@/components/common/Navbar";
import Footer from "@/components/common/Footer";

export function Providers({ children }: { children: React.ReactNode }) {
  const [queryClient] = React.useState(() => new QueryClient());

  return (
    <>
      <div>
        <QueryClientProvider client={queryClient}>
          <Toaster position="top-center" />
          <Navbar />
          {children}
          <Footer />
        </QueryClientProvider>
      </div>
    </>
  );
}
