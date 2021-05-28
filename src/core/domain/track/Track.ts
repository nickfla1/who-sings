import {TrackArtist} from '@core/domain/track/TrackArtist';
import {TrackLyricsSnippet} from '@core/domain/track/TrackLyricsSnippet';

export class Track {
  constructor(
    public readonly id: number,
    public readonly name: string,
    public readonly artist: TrackArtist,
    public lyrics?: TrackLyricsSnippet,
  ) {}

  public isArtist(artist: TrackArtist): boolean {
    return this.artist.id === artist.id;
  }
}
