import {User} from '@core/domain/user/User';
import {UserRepository} from '@core/domain/user/UserRepository';
import {UserRepositoryImpl} from '@core/infrastructure/user/UserRepositoryImpl';
import AsyncStorage from '@react-native-community/async-storage';

describe('UserRepositoryImpl', () => {
  let repository: UserRepository;

  beforeEach(function () {
    repository = new UserRepositoryImpl(AsyncStorage);
  });

  it('should retrieve an user by its name', async () => {
    await repository.createUser(new User('TEST_NAME_1'));
    await repository.createUser(new User('TEST_NAME_2'));

    const user = await repository.getByName('TEST_NAME_1');

    expect(user).toBeDefined();
    expect(user!.name).toBe('TEST_NAME_1');
  });

  it('should set a logged in user', async () => {
    const user = new User('TEST_NAME_1');
    await repository.logUserIn(user);

    const loggedInUser = await repository.getLoggedUser();

    expect(loggedInUser).toBeDefined();
    expect(loggedInUser!.name).toBe(user.name);
  });

  it('should logout the user', async () => {
    const user = new User('TEST_NAME_1');
    await repository.logUserIn(user);

    await repository.logout();

    const loggedInUser = await repository.getLoggedUser();

    expect(loggedInUser).toBeNull();
  });
});
