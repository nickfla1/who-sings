/**
 * IMPORTANT:
 * This doesn't represent the complete data object but only a subset
 * of properties relevant to the scope of this application.
 * Refer to the official docs for a complete example:
 * https://developer.musixmatch.com/documentation/api-reference/track-snippet-get
 */
export interface SnippetApiModel {
  snippet_body: string;
  script_tracking_url: string;
}
