import {
  GAMES_TO_SHOW,
  RankingService,
} from '@core/application/ranking/RankingService';
import {Game} from '@core/domain/game/Game';
import {GameRepository} from '@core/domain/game/GameRepository';
import {User} from '@core/domain/user/User';
import {mock, mockReset} from 'jest-mock-extended';

const TestUser1 = new User('User1');
const TestUser2 = new User('User2');

describe('RankingService', () => {
  let service: RankingService;
  const gameRepository = mock<GameRepository>();

  beforeEach(() => {
    mockReset(gameRepository);
    service = new RankingService(gameRepository);
  });

  it('should return ranked games', async () => {
    gameRepository.allGames.mockReturnValue(
      Promise.resolve([
        new Game(TestUser1, 3),
        new Game(TestUser2, 7),
        new Game(TestUser1, 2),
      ]),
    );
    const games = await service.getRanking();

    expect(games.length).toBeLessThanOrEqual(GAMES_TO_SHOW);

    // Each user should show up only once
    const gameUsers = games.map((game) => game.user.name);

    // https://stackoverflow.com/a/57002833
    const isArrayUnique = (arr: Array<any>): boolean =>
      Array.isArray(arr) && new Set(arr).size === arr.length;

    expect(isArrayUnique(gameUsers)).toBeTruthy();
  });
});
