import {User} from './User';

export interface UserRepository {
  getByName(name: string): Promise<User | null>;

  getLoggedUser(): Promise<User | null>;

  createUser(user: User): Promise<User>;

  logUserIn(user: User): Promise<void>;

  logout(): Promise<void>;
}
