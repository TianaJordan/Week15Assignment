import Song from "./Song";
import { SongItem } from "../types";

// set type to pass data to child components
type SongListProps = {
    songs: SongItem[];
    deleteSong: (id:string) => void;
    toggleFavorite: (id:string) => void;
};

// loop through data array and render single song
export default function SongList({ songs, deleteSong, toggleFavorite }: SongListProps) {
    console.log({ songs });

    return (
        <>
            {songs?.length > 0 ? (
                songs.map((song: SongItem) => (
                <div key={song.id}>
                <Song 
                    song={song} 
                    deleteSong={deleteSong}
                    toggleFavorite={toggleFavorite}
                />
                </div>
                ))
            ) : (
            <h2
                style={{ textAlign: "center", marginTop: "50px", color: "lightgrey" }}
                >
                This playlist has no songs
            </h2>
            )}
        </>
    );
} 