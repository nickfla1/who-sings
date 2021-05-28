export class LyricsBody {
  constructor(public readonly lines: string[]) {}

  public static fromString(body: string): LyricsBody {
    if (body === null || body === undefined) {
      throw new Error('[LyricsBody] Cannot create LyricsBody from null string');
    }

    const lines = body.split('\n');
    return new LyricsBody(lines);
  }
}
