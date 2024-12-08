import { ListOfPlaylistContainer, ListOfRecentSongsContainer, PlaylistContainer, RecentSongsContainer, RecentSongsNameAndAlbumContainer, SearchInputContainer, SideBarContainer, SideBarTitle, SideBarTitleAndCreatePlaylist, SongAndTimeContainer } from "./styles";

import { IoMdPlay } from "react-icons/io";





interface Playlist {
    name: string;
    id: string;
}
interface Song {
    name: string;
    id: string;
    album: string;
}

export default function SideBar() {

    const playlists: Playlist[] = [
        { name: "Guilherme Playlist", id: "1" }, { name: "Outras Playlist", id: "2" }, { name: "também Playlist", id: "3" }
    ]
    const recentSongs: Song[] = [
        { name: "Machine", id: "1", album: "Guilherme" }, { name: "The kill", id: "2", album: "Guilherme" }, { name: "Crown", id: "3", album: "Guilherme" }
    ]

    return (
        <SideBarContainer>
            <SideBarTitleAndCreatePlaylist>
                <SideBarTitle>Suas Playlists</SideBarTitle>
            </SideBarTitleAndCreatePlaylist>
            <SearchInputContainer>
                <input type="search" name="" id="" placeholder="Pesquise sua playlist" />
            </SearchInputContainer>
            <ListOfPlaylistContainer>
                {playlists.map((playlist) => (
                    <PlaylistContainer key={playlist.id}>
                        <h2>{playlist.name}</h2>
                        <p>Playlist</p>
                    </PlaylistContainer>
                ))}
            </ListOfPlaylistContainer>

            {/* conteudo estático somente para compor a sideBar */}
            <ListOfRecentSongsContainer>
                <SideBarTitle>Lançamentos</SideBarTitle>
                {recentSongs.map((song) => (
                    <RecentSongsContainer key={song.id}>
                        <RecentSongsNameAndAlbumContainer>
                            <h2>{song.name}</h2>
                            <p>{song.album}</p>
                        </RecentSongsNameAndAlbumContainer>
                        <IoMdPlay />
                    </RecentSongsContainer>
                ))}
            </ListOfRecentSongsContainer>
        </SideBarContainer>
    )
}