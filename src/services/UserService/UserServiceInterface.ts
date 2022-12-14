export interface User {
    id: string;
    firstname: string;
    lastname: string;
    gender: 'm' | 'f';
    email: string;
    domain: string;
    work: string;
}

export interface UserServiceInterface {
    login(email: string, password: string): Promise<boolean>
    logout(): Promise<boolean>
    getUser(): Promise<User | null>;
    updateUser(user: Partial<User>): Promise<User>;
}