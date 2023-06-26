import React from 'react';
import { usePlaylistState } from '../Context/ContextReducer';
import Button from '@mui/material/Button';

type ModalProps = {
  onClose: () => void;
};

const MODAL_STYLES: React.CSSProperties = {
  position: "fixed",
  top: "0",
  left: "5%",
  background: "linear-gradient(180deg, rgba(36,0,36,1) 6%, rgba(9,9,121,0.2359068627450981) 100%)",
  zIndex: "10000",
  height: '100vh',
  width: "15%",
  display: "flex",
  justifyContent: "flex-start",
  alignItems: "center",
  flexDirection: "column",
};

export const PlaylistModal = (props: ModalProps) => {

  const playlistState = usePlaylistState();
  const [newPlaylist, setNewPlaylist] = React.useState("");
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewPlaylist(event?.target.value)
  }
  const handleClick = () => {
    playlistState.dispatch({ type: "CREATE_PLAYLIST", payload: { playlistName: newPlaylist } })
    setNewPlaylist("")
  }

  return <>

    <div style={MODAL_STYLES} onMouseLeave={props.onClose}>
      <h3 className='display-6 text-center mt-4' style={{ color: "white", fontSize: "4vmin" }}>Playlists</h3>

      <ul style={{ listStyleType: "none", padding: "0px", textAlign: "center" }}>
        <li >
          <input style={{ width: "80%" }} onChange={handleChange} value={newPlaylist} />
          <Button variant="contained" color="secondary" onClick={handleClick} style={{ fontSize: "2vmin", width: "70%", marginTop: "5px" }}>
            Create
          </Button>
        </li>
        {playlistState.playlists.length === 1 ? <li style={{ color: "white" }}>No Playlist Added</li> : null}
        {playlistState.playlists.map((playlist) => {
          if (playlist.name !== "favourites")
            return (
              <li><a href={`#${playlist.name}`} style={{ textDecoration: "none", color: "white" }}>{playlist.name}</a></li>
            )
        })}

      </ul>
    </div>

  </>


};

