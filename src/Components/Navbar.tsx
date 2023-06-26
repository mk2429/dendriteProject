import React, { useState } from "react";
import RoofingIcon from '@mui/icons-material/Roofing';
import ManageSearchIcon from '@mui/icons-material/ManageSearch';
import FavoriteIcon from '@mui/icons-material/Favorite';
import PlaylistAddIcon from '@mui/icons-material/PlaylistAdd';
import WbSunnyIcon from '@mui/icons-material/WbSunny';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import { PlaylistModal } from "./Playlist";
import { SearchModal } from "./Search";


export const Navbar = () => {
    const [showPlaylist, setShowPlaylist] = useState(false)
    const [showSearch, setShowSearch] = useState(false)
    const [isHomeHovered, setHomeHovered] = useState(false);
    const [isSearchHovered, setSearchHovered] = useState(false);
    const [isFavoritesHovered, setFavoritesHovered] = useState(false);
    const [isPlaylistsHovered, setPlaylistsHovered] = useState(false);

    const handlePlaylist = () => {
        setShowPlaylist(!showPlaylist)
        console.log("bgb")
    }
    const handleSearch = () => {
        setShowSearch(!showSearch)
        console.log("bgb")
    }
    const [isSunHovered, setisSunHovered] = useState(false)
    const [isMoonHovered, setisMoonHovered] = useState(false)



    return (<>

        <div className="px-4 " style={{
            background: `linear-gradient(90deg, rgba(0,0,0,1) ${isSunHovered ? '10%' : '70%'}, rgba(9,9,121,0.2359068627450981) 110%)`,
            display: "flex", flexDirection: "row", flexWrap: "wrap", width: "100%", justifyContent: "space-around", alignItems: "center", position: "absolute", top: "0px"
        }}>
            <div><img src="https://i.ibb.co/nkzBMNv/logo.png" style={{ height: "12vw", minHeight: "80px", maxHeight: "140px", marginRight: "10px" }} /></div>
            <div><h1 style={{ color: "white", textAlign: "center", fontSize: "5vmin" }}>Your Favourite Tunes<br />All <DarkModeIcon style={{ color: "yellow", fontSize: isMoonHovered ? "8vmin" : "6vmin" }} onMouseEnter={() => setisMoonHovered(true)} onMouseLeave={() => setisMoonHovered(false)} />  and All <WbSunnyIcon style={{ color: "yellow", fontSize: isSunHovered ? "8vmin" : "6vmin" }} onMouseEnter={() => setisSunHovered(true)} onMouseLeave={() => setisSunHovered(false)} />  </h1></div>
        </div>

        <div className="    mx-0  d-flex align-items-center justify-content-center" style={{ width: "7%", height: "100%", background: "linear-gradient(180deg, rgba(0,0,0,1) 60%, rgba(9,9,121,0.2359068627450981) 110%)", position: "fixed", top: "0px", left: "0px" }}>
            <div className="  px-3 pt-2  text-white " >

                <ul className="nav  nav-pills flex-column  mb-0  align-items-center  align-items-md-start " id="menu"  >
                    <li className="nav-item">
                        <div onClick={() => { window.location.href = "#" }} className="btn" >
                            <RoofingIcon style={{ color: isHomeHovered ? "orange" : "white", fontSize: isHomeHovered ? "7vmin" : "4vmin" }} onMouseEnter={() => setHomeHovered(true)} onMouseLeave={() => setHomeHovered(false)} /> <span className="ms-1 d-none d-md-inline fs-7" style={{ color: "white", fontSize: "2vmin" }}>Home</span>
                        </div>
                    </li>


                    <li>

                        <div className="btn" onClick={handleSearch}   >
                            <ManageSearchIcon style={{ color: isSearchHovered ? "orange" : "white", fontSize: isSearchHovered ? "7vmin" : "4vmin" }} onMouseEnter={() => setSearchHovered(true)} onMouseLeave={() => setSearchHovered(false)} /> <span className="ms-0 d-none d-md-inline fs-7" style={{ color: "white", fontSize: "2vmin" }}>Search</span>
                        </div>
                    </li>


                    <li>
                        <div onClick={() => { window.location.href = "#favourites" }} className="btn">
                            <FavoriteIcon style={{ color: isFavoritesHovered ? "red" : "white", fontSize: isFavoritesHovered ? "7vmin" : "4vmin" }} onMouseEnter={() => setFavoritesHovered(true)} onMouseLeave={() => setFavoritesHovered(false)} /> <span className="ms-0 d-none d-md-inline fs-7" style={{ color: "white", fontSize: "2vmin" }}>Favourites</span>
                        </div>
                    </li>


                    <li>

                        <div className="btn" onClick={handlePlaylist} >
                            <PlaylistAddIcon style={{ color: isPlaylistsHovered ? "orange" : "white", fontSize: isPlaylistsHovered ? "7vmin" : "4vmin" }} onMouseEnter={() => setPlaylistsHovered(true)} onMouseLeave={() => setPlaylistsHovered(false)} /> <span className="ms-0 d-none d-md-inline fs-7 hover-zoom hover-shadow" style={{ color: "white", fontSize: "2vmin" }}>Playlists</span>
                        </div>


                    </li>

                </ul>
                <hr />


            </div>
        </div>
        {showPlaylist ? <PlaylistModal onClose={() => setShowPlaylist(false)} /> : null}
        {showSearch ? <SearchModal onClose={() => setShowSearch(false)} /> : null}





    </>
    )
}
