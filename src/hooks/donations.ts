import { useQuery, UseQueryResult } from "@tanstack/react-query";
import SingletonSupabaseService from "../services/UserService/SingletonSupabaseClient";

interface QueryParams {
  limit?: number;
}

interface Donation {
  id: string;
  donation: number;
  created_at: string;
  payment_type: string;
}

type UseDonationType = (params?: QueryParams) => UseQueryResult<Donation[]>;
export const useDonations: UseDonationType = (params) =>
  useQuery(["donations"], async () => {
    const client = SingletonSupabaseService.getInstance();
    const { limit } = params || {};

    let query = client
      .from("donation")
      .select("*")
      .order("created_at", { ascending: false });

    if (limit) query = query.limit(limit);

    return query.then(({ data, error }) => {
      if (error) {
        console.error(error);
        return [];
      }

      return data;
    });
  });
