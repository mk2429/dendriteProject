import React, { useState, useEffect, createContext, useContext } from "react";

const url = 'https://shazam.p.rapidapi.com/songs/list-recommendations?key=484129036&locale=en-US';
const options = {
  method: 'GET',
  headers: {
    'X-RapidAPI-Key': '8183d6c59amsh359abbdb44db3e0p1fe918jsn0aaf9408e52c',
    'X-RapidAPI-Host': 'shazam.p.rapidapi.com'
  }
};
type Track = {
  id: number;
  title: string;
  url: string;
  images: {
    coverart: string;
  };
};

type SongProviderType = {
  children: React.ReactNode
}

type SongContextType = {
  allSongs: Track[]
}

const SongContext = createContext<SongContextType | undefined>(undefined);


export const AllSongProvider = ({ children }: SongProviderType) => {
  const [allSongs, setAllSongs] = useState<Track[]>([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(url, options);
        const result = await response.json();

        setAllSongs(result.tracks);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);
  return (
    <SongContext.Provider value={{ allSongs }}>
      {children}
    </SongContext.Provider>
  );
};

export const useAllSong = (): SongContextType => {
  const context = useContext(SongContext);
  if (!context) {
    throw new Error('Error in PlaylistProvider');
  }
  return context;
};
