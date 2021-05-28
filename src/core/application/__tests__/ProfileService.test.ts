import {ProfileService} from '@core/application/profile/ProfileService';
import {Game} from '@core/domain/game/Game';
import {GameRepository} from '@core/domain/game/GameRepository';
import {User} from '@core/domain/user/User';
import {UserRepository} from '@core/domain/user/UserRepository';
import {mock, mockReset} from 'jest-mock-extended';

const TestUser1 = new User('TestUser1');
const TestUser2 = new User('TestUser2');
const TestGame1 = new Game(TestUser1, 1);
const TestGame2 = new Game(TestUser2, 1);

describe('ProfileService', () => {
  let service: ProfileService;
  const userRepository = mock<UserRepository>();
  const gameRepository = mock<GameRepository>();

  beforeEach(() => {
    mockReset(userRepository);
    mockReset(gameRepository);
    service = new ProfileService(userRepository, gameRepository);
  });

  it('should get profile info', async () => {
    userRepository.getLoggedUser.mockReturnValue(Promise.resolve(TestUser1));
    gameRepository.allGames.mockReturnValue(
      Promise.resolve([TestGame1, TestGame2]),
    );

    const result = await service.getProfileInfo();
    expect(result.user).toEqual(TestUser1);
    expect(result.games).toHaveLength(1);
    expect(result.games[0]).toEqual(TestGame1);
  });
});
