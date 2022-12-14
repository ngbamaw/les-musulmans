import UserService from "./UserService";

class SingletonUserService {
  private static instance: UserService;

  private constructor() {
    SingletonUserService.instance = new UserService();
  }

  public static getInstance(): UserService {
    if (!SingletonUserService.instance) {
      new SingletonUserService();
    }
    return SingletonUserService.instance;
  }
}

export default SingletonUserService;
