import {User} from '../../domain/user/User';
import {UserRepository} from '../../domain/user/UserRepository';

export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  public async isLoggedIn(): Promise<boolean> {
    return !!(await this.userRepository.getLoggedUser());
  }

  public async registerUser(name: string): Promise<User> {
    if (!name) {
      throw new Error(
        '[UserService] User name must be defined and a non-empty string',
      );
    }

    const user = new User(name);
    await this.userRepository.createUser(user);
    await this.userRepository.logUserIn(user);

    return user;
  }

  public async loggedInUser(): Promise<User | null> {
    return this.userRepository.getLoggedUser();
  }

  public logout(): Promise<void> {
    return this.userRepository.logout();
  }
}
