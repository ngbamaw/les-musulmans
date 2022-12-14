import { createClient, SupabaseClient } from "@supabase/supabase-js";
import SingletonSupabaseService from "./SingletonSupabaseClient";
import { User, UserServiceInterface } from "./UserServiceInterface";

class UserService implements UserServiceInterface {
  private client: SupabaseClient;

  constructor() {
    this.client = SingletonSupabaseService.getInstance();
  }

  async login(email: string, password: string): Promise<boolean> {
    const result = await this.client.auth.signInWithPassword({
      email,
      password,
    });

    return !!result.data.user;
  }

  async logout(): Promise<boolean> {
    const result = await this.client.auth.signOut();

    if (result.error) {
      throw result.error;
    }

    return true;
  }
  
  async getUser(): Promise<User | null> {
    const result = await this.client.auth.getUser();

    if (result.error) return null;

    let { data, error } = await this.client.from("profile").select("*");

    if (error) {
      throw new Error("Error fetching user profile");
    }
    if (!data || data.length === 0) {
      return null;
    }

    const profile = data[0];

    return {
      id: result.data.user.id as string,
      firstname: profile.firstname,
      lastname: profile.lastname,
      email: result.data.user.email as string,
      domain: profile.domain,
      work: profile.work,
      gender: "m",
    };
  }

  async updateUser(user: Partial<User>): Promise<User> {
    const result = await this.client.from("profile").update({
      firstname: user.firstname,
      lastname: user.lastname,
      domain: user.domain,
      work: user.work,
    }).eq("id", user.id);

    if (result.error) {
      console.error(result.error);
      throw new Error("Fail to update user profile");
    }

    const newUser = await this.getUser();

    if (!newUser) {
      throw new Error("Fail to fetch user profile");
    }

    return newUser;
  }
}

export default UserService;
