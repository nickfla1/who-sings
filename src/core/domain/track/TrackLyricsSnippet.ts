import {LyricsBody} from '@core/domain/track/LyricsBody';

export class TrackLyricsSnippet {
  constructor(
    public readonly body: LyricsBody,
    public readonly trackingUrl: string,
  ) {}
}
