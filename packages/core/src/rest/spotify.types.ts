export type SpotifyPlaylist = {
  name: string;
  numberOfTrack: number;
  tracks: SpotifyTrack[];
}

export type SpotifyTrack = {
  index: number;
  title: string;
  artist: string;
  album: string;
  duration: string;
  thubnail: string;
}
