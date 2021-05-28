import {Game} from '@core/domain/game/Game';
import {GameRepository} from '@core/domain/game/GameRepository';
import {User} from '@core/domain/user/User';
import {UserRepository} from '@core/domain/user/UserRepository';

const GAMES_TO_SHOW = 10;

interface ProfileInfo {
  user: User;
  games: Game[];
}

export class ProfileService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly gameRepository: GameRepository,
  ) {}

  public async getProfileInfo(): Promise<ProfileInfo> {
    // Retrieve user
    const user = await this.userRepository.getLoggedUser();
    if (!user) {
      throw new Error('[ProfileService] Error retrieving logged user');
    }

    // Get all games and filter by user
    const allGames = await this.gameRepository.allGames();
    let userGames = allGames.filter((game) => {
      return game.user.name === user.name;
    });

    // Sort games by play time
    userGames = userGames.sort((a, b) => b.timestamp! - a.timestamp!);

    // Take only first `GAMES_TO_SHOW` games
    userGames = userGames.slice(0, GAMES_TO_SHOW);

    return {
      user,
      games: userGames,
    };
  }
}
