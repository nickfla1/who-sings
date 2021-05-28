import {UserService} from '@core/application/user/UserService';
import {UserRepositoryImpl} from '@core/infrastructure/user/UserRepositoryImpl';
import AsyncStorage from '@react-native-community/async-storage';

export interface RegisterScreen {
  onUserRegistered(): void;

  onError(error: Error | string): void;
}

export class RegisterPresenter {
  private userService: UserService;

  constructor(private readonly screen: RegisterScreen) {
    const userRepository = new UserRepositoryImpl(AsyncStorage);
    this.userService = new UserService(userRepository);
  }

  public registerUserWithName(name: string): void {
    this.userService
      .registerUser(name)
      .then(this.screen.onUserRegistered)
      .catch(this.screen.onError);
  }
}
