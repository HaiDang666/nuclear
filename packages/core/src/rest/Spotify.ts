import spotifyUri from 'spotify-uri';
import { SpotifyPlaylist } from './spotify.types';
import playlistHelper, { Playlist } from '../helpers/playlist';
import logger from 'electron-timber';

const PLAYLIST_SERVER_URL = 'https://nuclear-test.herokuapp.com/spotify?url=';

const getPlaylistFromUrl = (url: string): Promise<Playlist> => 
  new Promise((resolve, reject) => {

    let parsedUri;

    try {
      parsedUri = spotifyUri.parse(url);
    } catch (err) {
      return reject(new Error('Invalid spotify uri'));
    }
    
    try {
      fetch(`${PLAYLIST_SERVER_URL}${spotifyUri.formatOpenURL(parsedUri)}`)
        .then(r => {
          if (r.status !== 200) {
            return reject(new Error('Get playlist server error'));
          }
          return r.json();
        })
        .then((j: SpotifyPlaylist) => {
          if (!j) {
            return reject(new Error('Get playlist server error'));
          }

          const newPlaylist = playlistHelper.formatPlaylistForStorage(j.name, j.tracks);
          resolve(newPlaylist);
        }).catch(reject);
    } catch (error) {
      logger.error(`An error when getting spotify playlist : ${PLAYLIST_SERVER_URL}`);
      logger.error(error);
      return reject(error);
    }
  });

export {
  getPlaylistFromUrl
};
