import React from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import UserProvider from "@components/account/UserProvider";
import Router from "@components/router";

const queryClient = new QueryClient();

const Account = () => {
  return (
      <QueryClientProvider client={queryClient}>
        <UserProvider>
          <Router />
        </UserProvider>
      </QueryClientProvider>
  );
};

export default Account;
