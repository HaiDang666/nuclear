import {
  ADD_PLAYLIST,
  LOAD_PLAYLISTS,
  DELETE_PLAYLIST,
  UPDATE_PLAYLIST,
  IMPORT_PLAYLIST_START,
  IMPORT_PLAYLIST_SUCCESS,
  IMPORT_PLAYLIST_ERROR
} from '../actions/playlists';

const initialState = {
  playlists: [],
  playlistImporting: false
};

export default function PlaylistsReducer(state=initialState, action) {
  switch (action.type) {
  case LOAD_PLAYLISTS:
  case ADD_PLAYLIST:
  case DELETE_PLAYLIST:
  case UPDATE_PLAYLIST:
    return Object.assign({}, state, {
      playlists: action.payload.playlists
    });
  case IMPORT_PLAYLIST_START:
    return {
      ...state,
      playlistImporting: true
    };
  case IMPORT_PLAYLIST_SUCCESS: 
    return {
      ...state,
      playlists: action.payload.playlists,
      playlistImporting: false
    };
  case IMPORT_PLAYLIST_ERROR:
    return {
      ...state,
      playlistImporting: false
    };
  default:
    return state;
  }
}
