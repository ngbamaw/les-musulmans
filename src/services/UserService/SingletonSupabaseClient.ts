import { createClient, SupabaseClient } from "@supabase/supabase-js";
import UserService from "./UserService";

class SingletonSupabaseService {
  private static instance: SupabaseClient;

  private constructor() {
    const supabaseUrl = "https://qivjqtevaoogrnqgnrdb.supabase.co";
    const supabaseKey = process.env.GATSBY_SUPABASE_KEY as string;

    SingletonSupabaseService.instance = createClient(supabaseUrl, supabaseKey);
  }

  public static getInstance(): SupabaseClient {
    if (!SingletonSupabaseService.instance) {
      new SingletonSupabaseService();
    }
    return SingletonSupabaseService.instance;
  }
}

export default SingletonSupabaseService;
