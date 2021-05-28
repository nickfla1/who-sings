import {Game} from '@core/domain/game/Game';
import {GameRepository} from '@core/domain/game/GameRepository';
import {AsyncStorageStatic} from '@react-native-community/async-storage';

const GAMES_STORAGE_KEY = 'storage.games';

export class GameRepositoryImpl implements GameRepository {
  constructor(private readonly asyncStorage: AsyncStorageStatic) {}

  public async saveGame(game: Game): Promise<void> {
    const games = await this.allGames();
    games.push(game);

    await this.asyncStorage.setItem(GAMES_STORAGE_KEY, JSON.stringify(games));
  }

  public async allGames(): Promise<Game[]> {
    try {
      const data = await this.asyncStorage.getItem(GAMES_STORAGE_KEY);
      if (!data) {
        return [];
      }

      return JSON.parse(data);
    } catch (ex) {
      return [];
    }
  }
}
