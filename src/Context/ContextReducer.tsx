import React, { createContext, useContext, useReducer } from 'react';
import { Track } from '../Components/SongCorousal';


type Playlist= {
  name: string;
  songs: Track[];
}

type PlaylistAction =
  | {
      type: 'ADD_TO_PLAYLIST';
      payload: {
        playlistName: string;
        track:Track
      };
    }
  | {
      type: 'CREATE_PLAYLIST';
      payload: {
        playlistName: string;
      };
    };

type PlaylistState ={
  playlists: Playlist[];
  dispatch:React.Dispatch<PlaylistAction>
}

const PlaylistStateContext = createContext<PlaylistState | undefined>(undefined);

const playlistReducer = (state: Playlist[], action: PlaylistAction): Playlist[] => {
  switch (action.type)  {
    case 'ADD_TO_PLAYLIST':
      return state.map((playlist) => {
        if (playlist.name === action.payload.playlistName) {
          
          return {
            ...playlist,
            songs: [...playlist.songs, action.payload.track],
          };
        }
        return playlist;
      });
    case 'CREATE_PLAYLIST':
      const existingPlaylist = state.find((playlist) => playlist.name === action.payload.playlistName);
      if (existingPlaylist) {
        return state; // Playlist with the same name already exists, do not create a new one
      }
      return [...state, { name: action.payload.playlistName, songs: [] }];
    default:
      throw new Error('Unhandled action type');
  }
};
type PlaylistProviderType={
    children:React.ReactNode
}

export const PlaylistProvider= ({ children} : PlaylistProviderType  ) => {
  const [playlists, dispatch] = useReducer(playlistReducer, []);

  return (
   
   
         <PlaylistStateContext.Provider value={{ playlists,dispatch }}>
        {children}
        </PlaylistStateContext.Provider>
  
    
  );
};

export const usePlaylistState = (): PlaylistState => {
  const context = useContext(PlaylistStateContext);
  if (!context) {
    throw new Error('usePlaylistState must be used within a PlaylistProvider');
  }
  return context;
};


