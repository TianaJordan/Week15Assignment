export type SongItem = {
    id: string;
    title: string;
    artist: string;
    favorited: boolean
}

export type NewSongItem = Omit<SongItem, "id">;