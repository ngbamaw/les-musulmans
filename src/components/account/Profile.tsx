import React, { useEffect } from "react";
import { useFormik } from "formik";
import classNames from "classnames";

import { useUpdateUser, useUser } from "@components/account/UserProvider";
import { User } from "@services/UserService/UserServiceInterface";

interface InputProps {
  label: string;
  name: string;
  value: string;
  disabled?: boolean;
  className?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const Input: React.FC<InputProps> = ({
  label,
  name,
  value,
  disabled,
  onChange,
  className,
}) => {
  return (
    <label className={classNames("flex flex-col", className)}>
      <p className="font-bold text-sm">{label}</p>
      <input
        name={name}
        className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-yellow-500 focus:border-yellow-500 focus:z-10 sm:text-sm"
        disabled={disabled}
        value={value}
        onChange={onChange}
      />
    </label>
  );
};

const Profile = () => {
  const { user, refresh } = useUser();
  const { updateUser, data } = useUpdateUser();

  const formik = useFormik({
    initialValues: user || ({} as User),
    onSubmit: (values) => {
      updateUser(values);
    },
  });

  useEffect(() => {
    if (data) refresh();
  }, [data]);


  return (
    <div className="">
      <form className="flex flex-col gap-4 p-12" onSubmit={formik.handleSubmit}>
        <div className="flex gap-2">
          <Input
            label="Nom"
            name="lastname"
            value={formik.values.lastname}
            onChange={formik.handleChange}
            className="flex-1"
          />
          <Input
            label="Prénom"
            name="firstname"
            value={formik.values.firstname}
            onChange={formik.handleChange}
            className="flex-1"
          />
        </div>
        <Input
          label="Email"
          name="email"
          disabled
          value={formik.values.email}
          onChange={formik.handleChange}
        />
        <Input
          label="Domain"
          name="domain"
          value={formik.values.domain}
          onChange={formik.handleChange}
        />
        <Input
          label="Métier"
          name="work"
          value={formik.values.work}
          onChange={formik.handleChange}
        />

        <button
          type="submit"
          className="group relative ml-auto w-fit flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-yellow-500 hover:bg-yellow-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500"
        >
          Valider
        </button>
      </form>
    </div>
  );
};

export default Profile;
