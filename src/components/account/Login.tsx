import React from "react";
import { Link, Form } from "react-router-dom";

import Logo from "@images/logo.svg";

const LoginPage: React.FC = () => {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2 -mt-28 px-14 text-center">
      <img className="w-auto h-24" src={Logo} alt="Les Musulmans" />
      <h2 className="mt-6 text-3xl font-extrabold text-gray-900">
        Connectez vous à votre compte
      </h2>
      <p className="mt-2 text-sm text-gray-600">
        Ou{" "}
        <Link
          to="/register"
          className="font-medium text-yellow-500 hover:text-yellow-500"
        >
          inscrivez vous
        </Link>
      </p>
      <Form method="post" className="mt-8 space-y-6">
        <input type="hidden" name="remember" value="true" />
        <div className="rounded-md shadow-sm -space-y-px">
          <div>
            <label htmlFor="email-address" className="sr-only">
              Adresse email
            </label>
            <input
              id="email-address"
              name="email"
              type="email"
              autoComplete="email"
              required
              className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-yellow-500 focus:border-yellow-500 focus:z-10 sm:text-sm"
              placeholder="Adresse email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="password" className="sr-only">
              Mot de passe
            </label>
            <input
              id="password"
              name="password"
              type="password"
              autoComplete="current-password"
              required
              className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-yellow-500 focus:border-yellow-500 focus:z-10 sm:text-sm"
              placeholder="Mot de passe"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <input
              id="remember-me"
              name="remember-me"
              type="checkbox"
              className="h-4 w-4 text-yellow-500 focus:ring-yellow-500 border-gray-300 rounded"
            />
            <label
              htmlFor="remember-me"
              className="ml-2 block text-sm text-gray-900"
            >
              Se souvenir de moi
            </label>
          </div>
          <div className="text-sm">
            <a
              href="#"
              className="font-medium text-yellow-500 hover:text-yellow-500"
            >
              Mot de passe oublié?
            </a>
          </div>
        </div>

        <div>
          <button
            type="submit"
            className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-yellow-500 hover:bg-yellow-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500"
          >
            Se connecter
          </button>
        </div>
      </Form>
    </div>
  );
};

export default LoginPage;
