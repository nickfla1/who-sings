import {UserService} from '@core/application/user/UserService';
import {User} from '@core/domain/user/User';
import {UserRepositoryImpl} from '@core/infrastructure/user/UserRepositoryImpl';
import AsyncStorage from '@react-native-community/async-storage';

export interface HomeScreen {
  /**
   * Invoked once the presenter start loading the logged in user.
   */
  onLoading(): void;

  /**
   * Invoked once the presenter has finished loading the logged in user.
   */
  onLoadingFinished(user: User): void;

  /**
   * Invoked by the presenter every time an error
   * occurs and we want to notify the user.
   */
  onError(error: Error | string): void;
}

export class HomePresenter {
  private userService: UserService;

  constructor(private readonly screen: HomeScreen) {
    const userRepository = new UserRepositoryImpl(AsyncStorage);
    this.userService = new UserService(userRepository);
  }

  public load(): void {
    this.screen.onLoading();
    this.userService
      .loggedInUser()
      .then((user) => this.screen.onLoadingFinished(user!))
      .catch(this.screen.onError);
  }
}
