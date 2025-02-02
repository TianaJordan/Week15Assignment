import './App.css'

import { Button } from 'react-bootstrap';
import { defaultSongs } from './data.ts'
import SongList from './components/SongList.tsx';
import Nav from "./components/Navbar.tsx";
import { useState } from 'react'

function App() {
  const [songs, setSongs] = useState(defaultSongs);

  // add a new song to the songlist 
  const addSong = () => {
    const newSong = {
      id: songs.length +1,
      title: "Song Title",
      artist: "Artist Name",
      favorited: false
    };

    // add new song to existing array of songs
    setSongs ([...songs, newSong]);
  };

  // filter songs by id and delete selected song
  const deleteSong = (id:number) => {
    const updatedSongs = songs.filter((song) => song.id !== id);
      
    setSongs(updatedSongs);
  };

  // display updated song list and toggle state of favorite button
  const toggleFavorite = (id:number) => {
    const updatedSongs = songs.map((song) => {
      if (song.id === id) {
        song.favorited = !song.favorited;
      }
      return song;
    });

    setSongs(updatedSongs);
  };

  return (
      <div className="container">
      <Nav></Nav>      
      <h1>My Playlist</h1>
      <Button variant="dark"
      // add functionality to add song button with event listener
      className="mt-2 mb-2" onClick={addSong}>Add Song</Button> 
      <SongList 
        songs={songs}
        deleteSong={deleteSong} 
        toggleFavorite={toggleFavorite}
      />
    </div>
  );
}

export default App