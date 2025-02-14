import './App.css'

import { Alert, Button, Form, Modal, Spinner} from 'react-bootstrap';
import { ChangeEvent, useState, useEffect } from 'react'

import { NewSongItem } from "./types.ts";
import SongList from './components/SongList.tsx';


const BASE_URL = "https://67afb826dffcd88a67876684.mockapi.io/songs"

function App() {
  const [songs, setSongs] = useState([]);
  const [newSongTitle, setNewSongTitle] = useState<string>("");
  const [newArtistName, setNewArtistName] = useState<string>("");
  const [show, setShow] = useState(false);
  const [showAlert1, setShowAlert1] = useState<boolean>(false);
  const [showAlert2, setShowAlert2] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

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

  // API request to retreive all songs
  const getSongs = async () => {
    setLoading(true); // set loading to true while waiting for response
    try {
      const response = await fetch(BASE_URL);
      const data = await response.json();
      setSongs(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false); // set loading to false after the response
    }      
  };

  // API request to add a new song
  const addSong = async (e: {preventDefault: () => void}) => {
    e.preventDefault();
    if(!newSongTitle || !newArtistName) {
          setShowAlert1(true);
          return;
        } else {
          setShowAlert2(true);
  }

  setLoading(true);
  const song: NewSongItem = {
    title: newSongTitle,
    artist: newArtistName,
    favorited: false,
  };

  try {
    await fetch(BASE_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(song),
    });
    await getSongs();
    setNewSongTitle("");
    setNewArtistName("");
  } catch (error) {
  } finally {
    setLoading(false);
    setShowAlert1(false);
    }
  };

  // API request to get a single song
  const getSong = async (id:string) => {
    try {
      const response = await fetch(`${BASE_URL}/${id}`);
      const data = await response.json();
      return data;
    } catch (error) {
      console.error(error);
    }
  };

  const toggleFavorite = async (id:string) => {
    setLoading(true);
    const song = await getSong(id);

    try {
      await fetch(`${BASE_URL}/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...song, favorited: !song.favorited }),
      });
      await getSongs();
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  // API request to delete a song
  const deleteSong = async (id:string) => {
    setLoading(true);
    try {
      await fetch(`${BASE_URL}/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });
      await getSongs();
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
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

  useEffect(() => {
      getSongs();
  }, []); // only run on first render 

  return (
      <div className="container">
      <h1>Playlist 1</h1>
      <Button className="add-button" variant="dark" onClick={handleOpenModal}>
        Add New Song
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
                  Please enter a song title and artist name before adding a new song to the playlist
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
                  The song has been added to the playlist
                </p>
            </Alert>
          )} 
        </Modal.Footer>
      </Modal>

      {loading ? (
        <div className="spinner-container">
          <Spinner animation="border" role="status" variant="secondary">
            <span className="visually-hidden">Loading...</span>
          </Spinner>
        </div>
      ) : (
      <SongList 
        songs={songs}
        deleteSong={deleteSong} 
        toggleFavorite={toggleFavorite}
      />
      )}
    </div>
  );
}

export default App;