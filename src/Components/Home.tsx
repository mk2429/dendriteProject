import  {useEffect } from "react";
import { Navbar } from "./Navbar";
import { SongCorousal } from "./SongCorousal";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { usePlaylistState } from '../Context/ContextReducer';
import { useAllSong } from "../Context/AllSongsContext";

export const Home = () => {
  const playlistState = usePlaylistState();
  const allSongArray=useAllSong();

  useEffect(() => {
    const makeFavourite = async () => {
      try {
        playlistState.dispatch({ type: "CREATE_PLAYLIST", payload: { playlistName: "favourites" } })
      } catch (error) {
        console.error(error);
      }
    };

    makeFavourite();
  }, []);
  return (
    <>
      <Navbar />
      
      <div style={{ width: "95%", position: "relative", left: "5%", top: "170px" ,zIndex:"0"}}>
      <SongCorousal heading="Recommendations" corousalArray={allSongArray.allSongs} />
        {playlistState.playlists.map((playlist,index)=>{
          return(
            <SongCorousal  heading={playlist.name} corousalArray={playlist.songs} />
          )
        })}
      </div>
      

    </>
  );
};
