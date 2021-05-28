import {ArtistApiModel} from '@core/infrastructure/musixmatch/models/ArtistApiModel';
import {SnippetApiModel} from '@core/infrastructure/musixmatch/models/SnippetApiModel';
import {TrackApiModel} from '@core/infrastructure/musixmatch/models/TrackApiModel';
import {stringify} from 'query-string';

const BASE_URL = 'https://api.musixmatch.com/ws/1.1/';
const API_KEY = 'c74012c79386ae3fe5b0bb056b659dc4';

// Supported endpoints
type Endpoint = 'chart.artists.get' | 'chart.tracks.get' | 'track.snippet.get';

/**
 * IMPORTANT:
 * This client does not implement all methods supported by the Musixmatch API
 * but only a subset of methods relevant to the application.
 * Reference the official docs for more information:
 * https://developer.musixmatch.com/documentation
 */
export class MusixmatchClient {
  public async chartTracksGet(
    page: number,
    perPage: number,
    country: string,
    withLyrics: boolean,
  ): Promise<TrackApiModel[]> {
    const params: Record<string, any> = {
      page: page,
      page_size: perPage,
    };

    if (withLyrics) {
      // Any value passed to f_has_lyrics (even a falsy one)
      // is interpreted as setting the flag.
      params.f_has_lyrics = true;
    }

    const {track_list} = await MusixmatchClient.makeRequest(
      'chart.tracks.get',
      {
        page: page,
        page_size: perPage,
        country: country,
        f_has_lyrics: withLyrics,
      },
    );

    if (!track_list) {
      return [];
    }

    // Get contents of the `track` object
    return track_list.map(
      (item: Record<string, any>): TrackApiModel => item.track,
    );
  }

  public async chartArtistsGet(
    page: number,
    perPage: number,
    country: string,
  ): Promise<ArtistApiModel[]> {
    const {artist_list} = await MusixmatchClient.makeRequest(
      'chart.artists.get',
      {
        page: page,
        page_size: perPage,
        country: country,
      },
    );

    if (!artist_list) {
      return [];
    }

    // Get contents of the `artist` object
    return artist_list.map(
      (item: Record<string, any>): ArtistApiModel => item.artist,
    );
  }

  public async trackSnippetGet(trackId: number): Promise<SnippetApiModel> {
    const {snippet} = await MusixmatchClient.makeRequest('track.snippet.get', {
      track_id: trackId,
    });

    if (!snippet) {
      throw new Error(
        `[MusixmatchClient] No lyrics snippet found for track id ${trackId}`,
      );
    }

    return snippet as SnippetApiModel;
  }

  private static async makeRequest(
    endpoint: Endpoint,
    parameters: Record<string, any>,
  ): Promise<any> {
    const query = stringify({
      format: 'json',
      apikey: API_KEY,
      ...parameters,
    });

    const url = `${BASE_URL}${endpoint}?${query}`;

    // Log request
    console.log(`[MusixmatchClient] HTTP request to: ${url}`);

    const result = await fetch(url);
    const jsonData = await result.json();
    return MusixmatchClient.parseResponse(jsonData);
  }

  private static parseResponse(
    response: Record<string, any>,
  ): Record<string, any> {
    if (
      !response.hasOwnProperty('message') ||
      !response.message.hasOwnProperty('header') ||
      !response.message.hasOwnProperty('body')
    ) {
      throw new Error('[MusixmatchClient] Malformed response data');
    }

    const {header, body} = response.message;
    if (header.status_code !== 200) {
      throw new Error(
        `[MusixmatchClient] Request returned with status code: ${header.status_code}`,
      );
    }

    return body;
  }
}
