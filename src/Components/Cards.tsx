import React, { useState} from 'react';
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { usePlaylistState } from '../Context/ContextReducer';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import 'bootstrap/dist/js/bootstrap.min.js';
import 'bootstrap/dist/css/bootstrap.min.css';


type CardProps = {
  songTitle: string;
  songUrl: string;
  bgImg: string;
  id:number;
  textColor?:string;
};

export const Card = (props: CardProps) => {
  const playlistState = usePlaylistState();
  const [isHovered, setIsHovered] = useState(false);
  const [isAddClicked,setAddClicked]=useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [playlistText,setPlaylistText]=useState("Playlists");
  const [isFavouriteClicked,setFavouriteClicked]=useState(false)
  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setAddClicked(false);
    setIsDropdownOpen(false)
    setFavouriteClicked(false)
  };

  const addSongToPlaylist = async (playlistName: string) => {
    try {
      await playlistState.dispatch({
        type: 'ADD_TO_PLAYLIST',
        payload: {
          playlistName: playlistName,
          track: {id:props.id,title:props.songTitle,url:props.songUrl,images:{coverart:props.bgImg}},
        },
      });
      setPlaylistText(`Added To ${playlistName}`)
      setIsDropdownOpen(false)
      setTimeout(() => { setPlaylistText("Playlist") }, 1000);
      
      console.log("from",playlistState?.playlists);
    } catch (error) {
      console.error('Error adding song to playlist:', error);
    }
  };
  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };


  const handleFavourite=()=>{
    addSongToPlaylist("favourites")
    console.log("fav",playlistState.playlists)
    setFavouriteClicked(true)
    setTimeout(() => { setFavouriteClicked(false) }, 10000);
  }

  return (
    <div
      style={{
        height: 'auto',
        width: '12vw',
        minWidth: isHovered?"150px":"140px",
        border: 'none',
        borderRadius: '30px',
        padding: '3px',
        margin: '10px',
      }}
    >
      <div
        style={{
          width: '100%',
          border: 'none',
          borderRadius: '30px',
          position: 'relative',
        }}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <a className="blockquote" href={props.songUrl} target="_blank" style={{ textDecoration: 'none', color: 'black' }}>
          <img src={props.bgImg} style={{ width:"100%", border: 'none', borderRadius: '30px' }} alt="xc" />
        </a>
        {isHovered && (
          <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%',borderRadius: '30px'  }}>
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%', background: 'rgba(0, 0, 0, 0.5)' ,borderRadius: '30px' }}>
              <Fab aria-label="add" onClick={() => setAddClicked(true)} style={{ background: 'white', color: 'black', transform: 'scale(0.6)' }}>
                <AddIcon style={{ fontSize: '30px', fontWeight: 'bold' }} />
              </Fab>
              <Fab aria-label="like" onClick={handleFavourite} style={{ background: 'white', color: 'red', marginLeft: '10px', transform: 'scale(0.6)' }}>
                <FavoriteIcon style={{ fontSize: '30px' }} />
              </Fab>
            </div>
          </div>
        )}
        {isAddClicked && (
          <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%',borderRadius: '30px' ,zIndex:"10000" }}>
            <div style={{ display: 'flex',flexDirection:'column', justifyContent: 'center', alignItems: 'center', height: '100%', background: '#116A7B' ,borderRadius: '30px' }}>
              <p className='display-6' style={{fontSize:"2vmin" , color:"white"}}>{playlistText}</p>
              <div className="btn-group">
        <button type="button" className="btn btn-info dropdown-toggle" onClick={toggleDropdown} id="dropdownButton">
          Choose
        </button>

        <div className={`dropdown-menu ${isDropdownOpen ? 'show' : ''}`}>
        {playlistState.playlists.length!==1?playlistState.playlists.map((playlist)=>{
          if(playlist.name!=="favourites")
                return(
                  <div className="dropdown-item" onClick={()=>addSongToPlaylist(playlist.name)}>{playlist.name}</div>
                )
            }):<div className='dropdown-item'>No Playlist Available!</div>}
          
        </div>
      </div>
            </div>
          </div>
        )}
         {isFavouriteClicked && (
          <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%',borderRadius: '30px' ,zIndex:"10000" }}>
            <div style={{ display: 'flex',flexDirection:'column', justifyContent: 'center', alignItems: 'center', height: '100%', background: '#116A7B' ,borderRadius: '30px' }}>
              <p className='display-6' style={{fontSize:"2vmin" , color:"white",fontWeight:"bold"}}>Added To Favourites</p>

              <FavoriteIcon style={{fontSize:"9vmin",color:"white"}}/>
            </div>
          </div>
        )}
      </div>
      <a className="blockquote" href={props.songUrl} target="_blank" style={{ textDecoration: 'none', color: 'black' }}>
        <p className="blockquote text-center" style={{ fontSize: '2vmin', marginTop: '6px',color:props.textColor }}>
          {props.songTitle}
        </p>
      </a>
  
    </div>
  );
};
