import {RankingService} from '@core/application/ranking/RankingService';
import {Game} from '@core/domain/game/Game';
import {GameRepositoryImpl} from '@core/infrastructure/game/GameRepositoryImpl';
import AsyncStorage from '@react-native-community/async-storage';

export interface RankingScreen {
  onLoading(): void;

  onLoadingFinished(games: Game[]): void;

  onError(error: Error | string): void;
}

export class RankingPresenter {
  private rankingService: RankingService;

  constructor(private readonly screen: RankingScreen) {
    const gameRepository = new GameRepositoryImpl(AsyncStorage);
    this.rankingService = new RankingService(gameRepository);
  }

  public load(): void {
    this.screen.onLoading();
    this.rankingService
      .getRanking()
      .then(this.screen.onLoadingFinished)
      .catch(this.screen.onError);
  }
}
