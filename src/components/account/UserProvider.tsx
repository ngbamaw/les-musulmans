import React, {
  createContext,
  ReactNode,
  useContext,
  useState,
  useEffect,
} from "react";
import { useQuery, useMutation } from "@tanstack/react-query";

import SingletonUserService from "@services/UserService/SingletonUserService";
import { User } from "@services/UserService/UserServiceInterface";

type Context = { user: User | null; refresh: () => void };
const userService = SingletonUserService.getInstance();
const UserContext = createContext<Context>({
  user: null,
  refresh: () => {},
});

const UserProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const {
    data: result,
    isError,
    isLoading,
    refetch,
  } = useQuery(["user"], () => userService.getUser());

  useEffect(() => {
    if (result) setUser(result || null);
  }, [result]);

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (isError) return <p>Something went wrong</p>;

  const refresh = () => refetch();

  return (
    <UserContext.Provider value={{ user, refresh }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);
export const useLogin = () => {
  const { mutate, data, isError, isLoading } = useMutation(
    ({ email, password }: { email: string; password: string }) =>
      userService.login(email, password)
  );

  return { login: mutate, data, isError, isLoading };
};

export const useUpdateUser = () => {
  const { mutate, data, isError, isLoading } = useMutation((user: User) =>
    userService.updateUser(user)
  );

  return { updateUser: mutate, data, isError, isLoading };
};

export default UserProvider;
