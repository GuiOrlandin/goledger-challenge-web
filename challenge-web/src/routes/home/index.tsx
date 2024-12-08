import { useEffect, useMemo, useState } from "react";
import SideBar from "../../components/sideBar";
import { ButtonsOptionContainer, CardListContainer, HomeContaienr, HomeContent, HomeMain, OptionButton, PaginationContainer, SelectedButtonsAndAddItemsButtonContainer } from "./styles";
import CardModel from "../../components/CardModel";
import { albumFetch, AlbumResponse } from "../../service/getAlbumFetch";
import { artistFetch, ArtistResponse } from "../../service/getArtistFetch";
import { songFetch, SongResponse } from "../../service/getSongFetch";
import { playlistFetch, PlaylistResponse } from "../../service/getPlaylistFetch";
import CreateItemDialog from "../../components/createItem";




export default function Home() {
    const { data, isLoading } = albumFetch()
    const { data: artistData } = artistFetch()
    const { data: songsData } = songFetch()
    const { data: playlistData } = playlistFetch()
    const [seletecButton, setSeletecButton] = useState<string>("all")
    const [allResponsesData, setAllResponsesData] = useState<(SongResponse | AlbumResponse | ArtistResponse | PlaylistResponse)[]>([])
    const [currentPage, setCurrentPage] = useState(1);





    function getPaginatedItems(data: any[], page: number, limit: number) {
        const startIndex = (page - 1) * limit;
        const endIndex = startIndex + limit;
        return data.slice(startIndex, endIndex);
    };

    function filterItemsByType(type: string) {
        return type === "all"
            ? allResponsesData
            : allResponsesData.filter((item) => item.type === type);
    }


    const limit = 15




    const filteredItems = useMemo(
        () => filterItemsByType(seletecButton),
        [seletecButton, allResponsesData]
    );

    const paginatedItems = useMemo(
        () => getPaginatedItems(filteredItems, currentPage, limit),
        [filteredItems, currentPage, limit]
    );

    const totalPages = Math.ceil(filteredItems.length / limit);
    const pages = Array.from({ length: totalPages }, (_, index) => index + 1);


    useEffect(() => {
        if (data && artistData && songsData && playlistData) {
            const combinedData = [
                ...data.map((item) => ({ ...item, type: "album" })),
                ...artistData.map((item) => ({ ...item, type: "artist" })),
                ...songsData.map((item) => ({ ...item, type: "song" })),
                ...playlistData.map((item) => ({ ...item, type: "playlist" })),
            ];

            const sortedData = combinedData.sort(
                (a, b) => new Date(b["@lastUpdated"]).getTime() - new Date(a["@lastUpdated"]).getTime()
            );

            setAllResponsesData(sortedData);
        }
    }, [data, artistData, songsData, playlistData]);




    return (
        <HomeContaienr>
            <SideBar />
            <HomeMain>
                <SelectedButtonsAndAddItemsButtonContainer>

                    <ButtonsOptionContainer>
                        <OptionButton
                            $isActive={seletecButton === "all"}
                            onClick={() => setSeletecButton("all")}
                        >Tudo</OptionButton>
                        <OptionButton
                            $isActive={seletecButton === "song"}
                            onClick={() => setSeletecButton("song")}
                        >Música</OptionButton>
                        <OptionButton
                            $isActive={seletecButton === "artist"}
                            onClick={() => setSeletecButton("artist")}
                        >Artista</OptionButton>
                        <OptionButton
                            $isActive={seletecButton === "playlist"}
                            onClick={() => setSeletecButton("playlist")}
                        >Playlist</OptionButton>
                        <OptionButton
                            $isActive={seletecButton === "album"}
                            onClick={() => setSeletecButton("album")}
                        >Album</OptionButton>
                    </ButtonsOptionContainer>
                    <CreateItemDialog />

                </SelectedButtonsAndAddItemsButtonContainer>
                <HomeContent>
                    {seletecButton === "all" &&
                        <h2>
                            Novidades
                        </h2>
                    }
                    {seletecButton === "song" &&
                        <h2>
                            Musicas
                        </h2>
                    }
                    {seletecButton === "artist" &&
                        <h2>
                            Artistas
                        </h2>
                    }
                    {seletecButton === "playlist" &&
                        <h2>
                            Playlist
                        </h2>
                    }
                    {seletecButton === "album" &&
                        <h2>
                            Album
                        </h2>
                    }
                    <CardListContainer>
                        {paginatedItems?.map((album) => (
                            <CardModel key={album["@key"]} data={album} />
                        ))}
                    </CardListContainer>

                    <PaginationContainer>
                        {pages.map(page => (
                            <OptionButton
                                key={page}
                                onClick={() => setCurrentPage(page)}
                                $isActive={currentPage === page}
                            >
                                {page}
                            </OptionButton>
                        ))}
                    </PaginationContainer>
                </HomeContent>
            </HomeMain>
        </HomeContaienr>
    )
} 