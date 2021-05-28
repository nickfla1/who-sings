import {UserService} from '@core/application/user/UserService';
import {User} from '@core/domain/user/User';
import {UserRepository} from '@core/domain/user/UserRepository';
import {mock, mockReset} from 'jest-mock-extended';

describe('UserService', () => {
  let service: UserService;
  const userRepository = mock<UserRepository>();

  beforeEach(() => {
    mockReset(userRepository);
    service = new UserService(userRepository);
  });

  it('should check if an user is logged in', async () => {
    const isLoggedIn = await service.isLoggedIn();
    expect(isLoggedIn).toStrictEqual(false);
    expect(userRepository.getLoggedUser).toBeCalledTimes(1);
  });

  it('should register an user by name', async () => {
    await service.registerUser('TEST_NAME');

    expect(userRepository.createUser).toBeCalledTimes(1);
    expect(userRepository.createUser).toBeCalledWith(new User('TEST_NAME'));

    expect(userRepository.logUserIn).toBeCalledTimes(1);
    expect(userRepository.logUserIn).toBeCalledWith(new User('TEST_NAME'));
  });

  it('should log the user out', async () => {
    await service.registerUser('TEST_NAME');
    await service.logout();
    const isLoggedIn = await service.isLoggedIn();

    expect(isLoggedIn).toStrictEqual(false);
    expect(userRepository.logout).toBeCalledTimes(1);
  });
});
