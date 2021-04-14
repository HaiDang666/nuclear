import uuidv4 from 'uuid/v4';
import _ from 'lodash';
import logger from 'electron-timber';

import { store, PlaylistHelper } from '@nuclear/core';
import { error, success } from './toasts';
import {
  deletePlaylistInjectable,
  updatePlaylistInjectable
} from './playlists.injectable';


export const LOAD_PLAYLISTS = 'LOAD_PLAYLISTS';
export const ADD_PLAYLIST = 'ADD_PLAYLIST';
export const DELETE_PLAYLIST = 'DELETE_PLAYLIST';
export const UPDATE_PLAYLIST = 'UPDATE_PLAYLIST';
export const IMPORT_PLAYLIST_START = 'IMPORT_PLAYLIST_START';
export const IMPORT_PLAYLIST_SUCCESS = 'IMPORT_PLAYLIST_SUCCESS';
export const IMPORT_PLAYLIST_ERROR = 'IMPORT_PLAYLIST_ERROR';


const importPlaylistStart = () => ({
  type: IMPORT_PLAYLIST_START,
  payload: { }
});

const importPlaylistSuccess = (playlists) => ({
  type: IMPORT_PLAYLIST_SUCCESS,
  payload: { playlists }
});

const importPlaylistError = () => ({
  type: IMPORT_PLAYLIST_ERROR,
  payload: { }
});

export function addPlaylist(tracks, name) {
  return dispatch => {
    let playlists = store.get('playlists') || [];
    const playlist = PlaylistHelper.formatPlaylistForStorage(name, tracks, uuidv4());

    if (_.isEmpty(tracks)) {
      dispatch({
        type: null
      });
      return;
    }

    if (playlists) {
      playlists.push(playlist);
    } else {
      playlists = [playlist];
    }

    store.set('playlists', playlists);
    dispatch({
      type: ADD_PLAYLIST,
      payload: { playlists }
    });
  };
}

export function deletePlaylist(id) {
  return dispatch => {
    const playlists = deletePlaylistInjectable(store)(id);
    
    dispatch({
      type: DELETE_PLAYLIST,
      payload: { playlists }
    });
  };
}

export function loadPlaylists() {
  return dispatch => {
    const playlists = store.get('playlists');

    dispatch({
      type: LOAD_PLAYLISTS,
      payload: { playlists: _.defaultTo(playlists, []) }
    });
  };
}

export function updatePlaylist(playlist) {
  return dispatch => {
    const playlists = updatePlaylistInjectable(store)(playlist);
    dispatch({
      type: UPDATE_PLAYLIST,
      payload: { playlists }
    });
  };
}

export function importPlaylist(url, source) {
  return async (dispatch) => {
    try {
      dispatch(importPlaylistStart());
      let playlists = store.get('playlists') || [];
      const playlist = await PlaylistHelper.getPlaylistFromUrl(url, source);

      if (playlists) {
        playlists.push(playlist);
      } else {
        playlists = [playlist];
      }

      store.set('playlists', playlists);
      dispatch(success(
        'Playlist created',
        `Playlist ${playlist.name} has been created`,
        null, null
      ));
      dispatch(importPlaylistSuccess(playlists));
    } catch (e) {
      logger.error(e);
      dispatch(error(
        `Failed to import playlist: ${e.message}`,
        `Using ${source}`,
        null, null
      ));
      dispatch(importPlaylistError());
    }
  };
}
