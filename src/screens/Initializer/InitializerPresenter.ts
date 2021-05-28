import {UserService} from '@core/application/user/UserService';
import {UserRepositoryImpl} from '@core/infrastructure/user/UserRepositoryImpl';
import AsyncStorage from '@react-native-community/async-storage';

export interface InitializerScreen {
  /**
   * Invoked once the presenter has finished loading the user information.
   */
  onLoadingFinished(isLoggedIn: boolean): void;

  /**
   * Invoked by the presenter every time an error
   * occurs and we want to notify the user.
   */
  onError(error: Error | string): void;
}

export class InitializerPresenter {
  private userService: UserService;

  constructor(private readonly screen: InitializerScreen) {
    const userRepository = new UserRepositoryImpl(AsyncStorage);
    this.userService = new UserService(userRepository);
  }

  public load(): void {
    this.userService
      .isLoggedIn()
      .then(this.screen.onLoadingFinished)
      .catch(this.screen.onError);
  }
}
