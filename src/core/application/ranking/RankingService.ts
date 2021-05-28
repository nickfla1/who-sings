import {Game} from '@core/domain/game/Game';
import {GameRepository} from '@core/domain/game/GameRepository';
import {maxWithProperty} from '@util/object-util';

export const GAMES_TO_SHOW = 10;

export class RankingService {
  constructor(private readonly gameRepository: GameRepository) {}

  public async getRanking(): Promise<Game[]> {
    let games = await this.gameRepository.allGames();

    // Get unique games (by user)
    games = this.bestGamePerUser(games);

    // Sort games by score
    games = games.sort((a, b) => b.score! - a.score);

    return games.slice(0, GAMES_TO_SHOW);
  }

  /**
   * Returns the game with the highest score grouped by user.
   * Inspired by https://stackoverflow.com/a/56205412
   */
  private bestGamePerUser(games: Game[]): Game[] {
    return Object.entries(
      games.reduce((c, game) => {
        (c[game.user.name] = c[game.user.name] || []).push(game);
        return c;
      }, {} as Record<string, any>),
    ).reduce((c, [_, list]) => {
      c.push(maxWithProperty(list, 'score'));
      return c;
    }, []);
  }
}
