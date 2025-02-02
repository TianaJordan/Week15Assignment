import { SongItem } from "../types";
import "./Song.css"
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';

// set type to pass data down to child components
type SongProps = {
    song: SongItem;
    deleteSong: (id:number) => void;
    toggleFavorite: (id:number) => void;
}

// pass down the props and render song list
export default function Song({ song, deleteSong, toggleFavorite }: SongProps) {
    return (
        <Container className="container p-0">
        <Row>
            <Col xs={10}>
                <p className={song?.favorited ? "song-title-favorited" : ""} id="title">{song.title}</p>
                <p id="artist">{song.artist}</p>
            </Col>
            <Col>
                <DropdownButton id="drp-dwn-btn" variant="outline-dark" title="Actions">
                <Dropdown.Item 
                    href="#/edit" 
                    // add functionality to favorite button with event listener and change button text based on current state 
                    onClick={() => toggleFavorite(song?.id)}>
                        {song?.favorited ? "Undo Favorite" : "Favorite"}
                    </Dropdown.Item>
                <Dropdown.Item 
                    href="#/delete" 
                    // add functionality to delete button with event listener
                    onClick={() => deleteSong(song?.id)}>Remove from Playlist</Dropdown.Item>
                </DropdownButton>
            </Col>
            </Row>
        </Container>
    );
}