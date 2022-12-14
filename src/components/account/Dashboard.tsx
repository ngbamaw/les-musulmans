import React from "react";

import { useDonations } from "@hooks/donations";

interface Donation {
  id: string;
  donation: number;
  created_at: string;
  payment_type: string;
}

const Dashboard: React.FC = () => {
  const { data, isError, isLoading } = useDonations({ limit: 2 });

  return (
    <div className="mx-auto max-w-screen-md">
      <p className="w-full ml-4 font-bold">Derniers dons</p>
      <ul className="flex flex-col w-full gap-4 p-4">
        {data?.map(({ id, donation, payment_type, created_at }: Donation) => (
          <li className="bg-white p-8 shadow-md" key={id}>
            {donation}€ - {payment_type} -{" "}
            {new Date(created_at).toLocaleDateString("fr-FR")}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Dashboard;
