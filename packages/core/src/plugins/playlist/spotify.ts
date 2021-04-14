import { Playlist } from '../../helpers/playlist';

import PlaylistProvider from '../playlistProvider';
import { Spotify } from '../../rest';

class SpotifyPlaylistProvider extends PlaylistProvider {

  constructor() {
    super();
    this.name = 'Spotify Playlist Provider';
    this.sourceName = 'Get playlist of spotify by headless chrome';
    this.description = 'Get playlist of spotify by headless chrome plugin';
    this.image = null;
    this.isDefault = false;
  }

  getByUrl(url: string): Promise<Playlist> {
    return Spotify.getPlaylistFromUrl(url);
  }
}

export default SpotifyPlaylistProvider;
