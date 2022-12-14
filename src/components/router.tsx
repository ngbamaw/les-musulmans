import React from 'react';
import {
  ActionFunction,
  createBrowserRouter,
  createRoutesFromElements,
  redirect,
  Route,
  RouterProvider,
} from 'react-router-dom';

import SingletonUserService from '@services/UserService/SingletonUserService';
import LayoutAccount from '@components/account/LayoutAccount';
import Dashboard from '@components/account/Dashboard';
import Profile from '@components/account/Profile';
import Donations from '@components/account/Donations';
import LoginPage from '@components/account/Login';

export enum routes {
  login = '/account/login',
  dashboard = '/account/',
  logout = '/account/logout',
  profile = '/account/profile',
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


const Router = () => {
  const [router, setRouter] = React.useState<any>(null);

  React.useEffect(() => {
    setRouter(
      createBrowserRouter(
        createRoutesFromElements(
          <Route path="/">
            <Route path="account">
              <Route element={<LayoutAccount />} loader={userProtection}>
                <Route index element={<Dashboard />} />
                <Route path="profile" element={<Profile />} />
                <Route path="donation" element={<Donations />} />
              </Route>
              <Route path="login" action={loginAction} element={<LoginPage />} loader={loginRedirection} />
              <Route path="logout" loader={logoutLoader} />
            </Route>
          </Route>
        )
      )
    );
  }, []);
  
  return router && <RouterProvider router={router} />;
};

export default Router;
