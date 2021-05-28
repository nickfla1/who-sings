import {ProfileService} from '@core/application/profile/ProfileService';
import {UserService} from '@core/application/user/UserService';
import {Game} from '@core/domain/game/Game';
import {User} from '@core/domain/user/User';
import {GameRepositoryImpl} from '@core/infrastructure/game/GameRepositoryImpl';
import {UserRepositoryImpl} from '@core/infrastructure/user/UserRepositoryImpl';
import AsyncStorage from '@react-native-community/async-storage';

export interface ProfileScreen {
  /**
   * Invoked before starting loading the user and games info.
   */
  onLoading(): void;

  /**
   * Invoked once the presenter has finished
   * loading the user and games info.
   */
  onLoadingFinished(user: User, games: Game[]): void;

  /**
   * Invoked once the presenter has logged the user out.
   */
  onLogout(): void;

  /**
   * Invoked by the presenter every time an error
   * occurs and we want to notify the user.
   */
  onError(error: Error | string): void;
}

export class ProfilePresenter {
  private readonly profileService: ProfileService;
  private readonly userService: UserService;

  constructor(private readonly screen: ProfileScreen) {
    const userRepository = new UserRepositoryImpl(AsyncStorage);
    const gameRepository = new GameRepositoryImpl(AsyncStorage);
    this.profileService = new ProfileService(userRepository, gameRepository);
    this.userService = new UserService(userRepository);
  }

  load(): void {
    this.screen.onLoading();
    this.profileService
      .getProfileInfo()
      .then(({user, games}) => {
        this.screen.onLoadingFinished(user, games);
      })
      .catch(this.screen.onError);
  }

  logout(): void {
    this.userService
      .logout()
      .then(this.screen.onLogout)
      .catch(this.screen.onError);
  }
}
