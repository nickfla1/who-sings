import {AsyncStorageStatic} from '@react-native-community/async-storage';
import {User} from '../../domain/user/User';
import {UserRepository} from '../../domain/user/UserRepository';

export const STORAGE_USERS_KEY = 'storage.users';
export const STORAGE_LOGGED_USER_NAME = 'storage.users.logged';

export class UserRepositoryImpl implements UserRepository {
  constructor(private readonly asyncStorage: AsyncStorageStatic) {}

  public async getByName(name: string): Promise<User | null> {
    const users = await this.allUsers();
    return users[name] || null;
  }

  public async getLoggedUser(): Promise<User | null> {
    try {
      const name = await this.asyncStorage.getItem(STORAGE_LOGGED_USER_NAME);
      if (!name) {
        return null;
      }

      return this.getByName(name);
    } catch (ex) {
      return null;
    }
  }

  public async createUser(user: User): Promise<User> {
    const users = await this.allUsers();
    users[user.name] = user;

    await this.asyncStorage.setItem(STORAGE_USERS_KEY, JSON.stringify(users));

    return user;
  }

  public async logUserIn(user: User): Promise<void> {
    await this.createUser(user); // Makes sure that we are managing an existent user
    return this.asyncStorage.setItem(STORAGE_LOGGED_USER_NAME, user.name);
  }

  public logout(): Promise<void> {
    return this.asyncStorage.removeItem(STORAGE_LOGGED_USER_NAME);
  }

  private async allUsers(): Promise<Record<string, User>> {
    try {
      const data = await this.asyncStorage.getItem(STORAGE_USERS_KEY);
      if (!data) {
        return {};
      }

      return JSON.parse(data);
    } catch (ex) {
      return {};
    }
  }
}
