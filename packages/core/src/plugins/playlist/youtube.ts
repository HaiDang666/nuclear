import { Playlist } from '../../helpers/playlist';

import PlaylistProvider from '../playlistProvider';
import { Youtube } from '../../rest';

class YoutubePlaylistProvider extends PlaylistProvider {

  constructor() {
    super();
    this.name = 'Youtube Playlist Provider';
    this.sourceName = 'Get playlist of Youtube by headless chrome';
    this.description = 'Get playlist of Youtube by headless chrome plugin';
    this.image = null;
    this.isDefault = false;
  }

  getByUrl(url: string): Promise<Playlist> {
    return Youtube.getYoutubePlaylist(url);
  }
}

export default YoutubePlaylistProvider;
