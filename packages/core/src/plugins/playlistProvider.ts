import Plugin from './plugin';
import { Playlist } from '../helpers/playlist';

abstract class PlaylistProvider extends Plugin {
  sourceName: string;

  abstract getByUrl(url: string): Promise<Playlist>;
}

export default PlaylistProvider;
