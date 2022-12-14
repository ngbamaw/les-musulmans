import React from "react";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
  redirect,
  ActionFunction,
} from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Dashboard from "@components/account/Dashboard";
import UserProvider from "@components/account/UserProvider";
import LoginPage from "@components/account/Login";
import LayoutAccount from "@components/account/LayoutAccount";
import Profile from "@components/account/Profile";
import SingletonUserService from "@services/UserService/SingletonUserService";
import Donations from "@components/account/Donations";

const queryClient = new QueryClient();

export enum routes {
  login = "/account/login",
  dashboard = "/account/",
  logout = "/account/logout",
  profile = "/account/profile",
}

const userService = SingletonUserService.getInstance();

const userProtection = async () => {
  const user = await userService.getUser();

  if (!user) {
    return redirect(routes.login);
  }

  return null;
};

const loginRedirection = async () => {
  const user = await userService.getUser();

  if (user) {
    return redirect(routes.dashboard);
  }

  return null;
};

const logoutLoader = async () => {
  await userService.logout();
  return redirect(routes.login);
};

interface Credentials {
  email: string;
  password: string;
}

const loginAction: ActionFunction = async ({ request }) => {
  const formData = await request.formData();
  const { email, password } = Object.fromEntries(formData) as Credentials;
  await userService.login(email, password);
  return redirect(routes.dashboard);
};

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/">
      <Route path="account">
        <Route element={<LayoutAccount />} loader={userProtection}>
          <Route index element={<Dashboard />} />
          <Route path="profile" element={<Profile />} />
          <Route path="donation" element={<Donations />} />
        </Route>
        <Route
          path="login"
          action={loginAction}
          element={<LoginPage />}
          loader={loginRedirection}
        />
        <Route path="logout" loader={logoutLoader} />
      </Route>
    </Route>
  )
);

const Account = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <UserProvider>
        <RouterProvider router={router} />
      </UserProvider>
    </QueryClientProvider>
  );
};

export default Account;
