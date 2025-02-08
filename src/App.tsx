import './App.css'

import { Alert, Button, Form, Modal} from 'react-bootstrap';

import { SongItem } from "./types.ts";
import { defaultSongs } from './data.ts';
import SongList from './components/SongList.tsx';
import { ChangeEvent, useState, useEffect } from 'react'

function App() {
  const [songs, setSongs] = useState<SongItem[]>(defaultSongs);
  const [newSongTitle, setNewSongTitle] = useState<string>("");
  const [newArtistName, setNewArtistName] = useState<string>("");
  const [show, setShow] = useState(false);
  const [showAlert1, setShowAlert1] = useState<boolean>(false);
  const [showAlert2, setShowAlert2] = useState<boolean>(false);

  // open modal when 'add song' button is clicked
  const handleOpenModal= () => setShow(true);
  // remove any alerts when modal is closed
  const handleCloseModal = () => {
    setShow(false);
    setShowAlert1(false);
    setShowAlert2(false);

    setNewSongTitle("");
    setNewArtistName("");
  };

   // submit values from input fields
   const handleSongTitleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setNewSongTitle(e.target.value);
  };
  const handleArtistNameChange = (e: ChangeEvent<HTMLInputElement>) => {
    setNewArtistName(e.target.value);
  };

  // set time limit for success alert
  useEffect(() => {
    if (showAlert2) {
      const timer = setTimeout(() => {
        setShowAlert2(false);
      }, 2000); 
      
      return () => clearTimeout(timer); // clear timeout if component unmounts or showAlert changes
    }
  }, [showAlert2]);

  // show required alert if no data is entered, otherwise add the new song to the playlist and show success alert
  const addSong = () => {
    if(!newSongTitle || !newArtistName) {
      setShowAlert1(true);
      return;
    } else {
      setShowAlert2(true)
    }

    const newSongItem = {
      id: songs.length +1,
      title: newSongTitle,
      artist: newArtistName,
      favorited: false
    };
    // add new song to existing array of songs 
    setSongs([...songs, newSongItem]);
    // clear the input fields after song is added
    setNewSongTitle("");
    setNewArtistName("");
    setShowAlert1(false); // automatically clear required alert when song is successfully added
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
      <h1>My Playlist</h1>
      <Button className=" mb-3" variant="dark" onClick={handleOpenModal}>
        Add Song
      </Button>
      <Modal show={show} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>New Song</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Title</Form.Label>
              <Form.Control
                type="text"
                value={newSongTitle}
                onChange={handleSongTitleChange}
                autoFocus
              />
            </Form.Group>
            <Form.Group
              className="mb-3"
              controlId="exampleForm.ControlTextarea1"
            >
              <Form.Label>Artist</Form.Label>
              <Form.Control 
                type="text"
                value={newArtistName}
                onChange={handleArtistNameChange}
               />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Close
          </Button>
          <Button variant="primary" onClick={addSong}>
            Add
          </Button>
          {showAlert1 && (
            <Alert
              variant="danger"
              style={{ marginTop: "15px" }}
              onClose={() => setShowAlert1(false)}
              dismissible
              >
                <p>
                  Please enter a song title and artist name before adding a new song to the playlist.
                </p>
            </Alert>
          )} 
          {showAlert2 && (
            <Alert
              variant="success"
              style={{ marginTop: "15px" }}
              onClose={() => setShowAlert2(false)}
              dismissible
              >
                <p>
                  The song has been added to the playlist.
                </p>
            </Alert>
          )} 
        </Modal.Footer>
      </Modal>
      <SongList 
        songs={songs}
        deleteSong={deleteSong} 
        toggleFavorite={toggleFavorite}
      />
    </div>
  );
}

export default App