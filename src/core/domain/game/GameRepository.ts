import {Game} from '@core/domain/game/Game';

export interface GameRepository {
  saveGame(game: Game): Promise<void>;

  allGames(): Promise<Game[]>;
}
