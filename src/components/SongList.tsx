import { ListGroup } from "react-bootstrap";

import Song from "./Song";
import { SongItem } from "../types";

// set type to pass data to child components
type SongListProps = {
    songs: SongItem[];
    deleteSong: (id:number) => void;
    toggleFavorite: (id:number) => void;
};

// loop through data array and render single song
export default function SongList({ songs, deleteSong, toggleFavorite }: SongListProps) {
    console.log({ songs });

    return (
        <ListGroup>
            {songs.map((song: SongItem) => (
            <ListGroup.Item key={song.id}>
            <Song 
                song={song} 
                deleteSong={deleteSong}
                toggleFavorite={toggleFavorite}
            />
            </ListGroup.Item>
        ))}
        </ListGroup>
    );
} 