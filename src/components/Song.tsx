import "./Song.css"

import { SongItem } from "../types";
import { ListGroup } from "react-bootstrap";
import DropdownButton from 'react-bootstrap/DropdownButton';
import Dropdown from 'react-bootstrap/Dropdown';

// set type to pass data down to child components
type SongProps = {
    song: SongItem;
    deleteSong: (id:number) => void;
    toggleFavorite: (id:number) => void;
}

// pass down the props and render song list
export default function Song({ song, deleteSong, toggleFavorite }: SongProps) {
    return (
        <ListGroup>
            <ListGroup.Item className="d-flex justify-content-between align-items-start">
                <div className="ms-2 me-auto">
                    <div 
                    className={song?.favorited ? "song-title-favorited" : ""} id="title">
                        {song.title}
                    </div>
                        {song.artist}
                </div>
                <DropdownButton 
                    variant="outline-dark" 
                    title="Actions">
                        <Dropdown.Item 
                            // add functionality to favorite button to change text based on current state 
                            onClick={() => toggleFavorite(song?.id)}>
                                {song?.favorited ? "Undo Favorite" : "Favorite"}
                            </Dropdown.Item>
                        <Dropdown.Item 
                            // add functionality to delete button to remove a song from the list
                            onClick={() => deleteSong(song?.id)}>Remove from Playlist</Dropdown.Item>
                </DropdownButton>
            </ListGroup.Item>
        </ListGroup>
    );
}