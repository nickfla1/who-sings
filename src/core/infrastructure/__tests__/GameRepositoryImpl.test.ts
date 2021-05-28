import {Game} from '@core/domain/game/Game';
import {GameRepository} from '@core/domain/game/GameRepository';
import {User} from '@core/domain/user/User';
import {GameRepositoryImpl} from '@core/infrastructure/game/GameRepositoryImpl';
import AsyncStorage from '@react-native-community/async-storage';

describe('GameRepositoryImpl', () => {
  let repository: GameRepository;

  beforeEach(function () {
    repository = new GameRepositoryImpl(AsyncStorage);
  });

  it('should save a game', async () => {
    const game = new Game(new User('name'), 10);

    await repository.saveGame(game);
    const games = await repository.allGames();

    expect(games).toEqual(expect.arrayContaining([game]));
  });
});
