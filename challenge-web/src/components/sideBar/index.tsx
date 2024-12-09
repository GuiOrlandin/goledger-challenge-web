import { FaMusic, FaPlus } from "react-icons/fa";
import { albumFetch } from "../../service/getAlbumFetch";
import { songFetch } from "../../service/getSongFetch";
import { CreatePlaylistButton, ListOfPlaylistContainer, ListOfRecentSongsContainer, PlaylistContainer, RecentSongsContainer, RecentSongsNameAndAlbumContainer, SideBarContainer, SideBarTitle, SideBarTitleAndCreatePlaylist } from "./styles";

import { playlistFetch } from "../../service/getPlaylistFetch";
import { useNavigate } from "react-router-dom";


export default function SideBar() {

    const { data: songsData } = songFetch()
    const { data: playlistData } = playlistFetch()
    const { data: albumsData } = albumFetch()

    const navigate = useNavigate()

    return (
        <SideBarContainer>
            <SideBarTitleAndCreatePlaylist>
                <SideBarTitle>Suas Playlists</SideBarTitle>
                <CreatePlaylistButton
                    onClick={() => navigate(`/playlist/createPlaylist`)}
                >
                    Criar
                    <FaPlus size={10} />
                </CreatePlaylistButton>
            </SideBarTitleAndCreatePlaylist>
            <ListOfPlaylistContainer>
                {playlistData && playlistData?.length >= 1 ? playlistData.slice(0, 5).map((playlist) => (
                    <PlaylistContainer key={playlist["@key"]}
                        onClick={() => navigate(`/playlist/${playlist["@key"]}`)}
                    >
                        <h2>{playlist.name}</h2>
                        <p>Playlist</p>
                    </PlaylistContainer>
                )) :
                    <h3>Crie sua playlist</h3>
                }
            </ListOfPlaylistContainer>
            <ListOfRecentSongsContainer>
                <SideBarTitle>Lançamentos</SideBarTitle>
                {songsData && songsData?.length > 0 ? songsData.slice(0, 4).map((song) => {
                    const albumDetails = albumsData?.find(
                        (album) => album["@key"] === song.album["@key"]
                    );
                    return (
                        <RecentSongsContainer key={song["@key"]}>
                            <RecentSongsNameAndAlbumContainer>
                                <h2>{song.name}</h2>
                                <p>{albumDetails?.name}</p>
                            </RecentSongsNameAndAlbumContainer>
                            <FaMusic />
                        </RecentSongsContainer>
                    )
                }
                ) :
                    <h3>Crie sua musica</h3>
                }
            </ListOfRecentSongsContainer>
        </SideBarContainer>
    )
}