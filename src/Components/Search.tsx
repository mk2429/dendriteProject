import React, { useState } from 'react';
import { useAllSong } from "../Context/AllSongsContext";
import { SongCorousal } from "./SongCorousal";
import { Track } from './SongCorousal';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
type ModalProps = {
  onClose: () => void;
};

const MODAL_STYLES: React.CSSProperties = {
  position: "fixed",
  top: "0",
  background: "linear-gradient(180deg, rgba(36,0,36,1) 60%, rgba(9,9,121,0.2359068627450981) 110%)",
  zIndex: "999",
  height: "auto",
  minHeight: "170px",
  width: "100%",
  display: "flex",
  alignItems: "center",
  flexDirection: "column",


};

export const SearchModal = (props: ModalProps) => {
  const allSongArray = useAllSong();
  const allSongTitleArray = allSongArray.allSongs.map((song) => song.title)
  const [search, setSearch] = useState("")
  let SearchedSongArray: Track[] = [];

  if (search !== "") {
    SearchedSongArray = allSongArray.allSongs.filter((song) =>
      song.title.toLowerCase().includes(search.toLowerCase())
    );
  }
  const handleInputChange = (event: React.ChangeEvent<{}>, value: string) => {
    setSearch(value);
  };

  return <>

    <div style={MODAL_STYLES} onMouseLeave={props.onClose}>
      <div style={{ display: "flex", justifyContent: "space-evenly", alignItems: "center", flexWrap: "wrap", width: "100%", marginTop: "40px" }}>
        <h3 className='display-6 text-center mt-4' style={{ color: "white", marginRight: "15px" }}>Search</h3>
        <Autocomplete
          disablePortal
          id="combo-box-demo"
          options={allSongTitleArray}
          sx={{ width: "30%", height: "auto", padding: "0 25px 5px 25px ", color: "white", background: "white", borderRadius: "50px" }}

          renderInput={(params) => <TextField {...params} label="Songs" variant='standard' value={search} onChange={(e) => { setSearch(e.target.value) }} style={{ color: "red", }} />}
          onInputChange={handleInputChange}
        />
      </div>
      <div>
        <SongCorousal heading={search} corousalArray={SearchedSongArray} textColor='white' />

      </div>
    </div>

  </>


};


