import {User} from '@core/domain/user/User';

export class Game {
  constructor(
    public readonly user: User,
    public score: number = 0,
    public timestamp?: number,
  ) {}

  public incrementScore(): void {
    this.score++;
  }
}
