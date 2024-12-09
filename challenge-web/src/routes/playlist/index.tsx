import { useNavigate, useParams } from "react-router-dom";
import { ChangeEvent, useEffect, useState } from "react";

import SideBar from "../../components/sideBar";
import { songFetch } from "../../service/getSongFetch";
import { playlistAsset } from "../../service/readAsset";
import { AddMusicaCard, Card, CardContainer, CreatePlaylistButton, CreatePlaylistContainer, LabelAndInputContainter, NameAndContent, NameInput, PlaylistContainer, PlaylistContent, PlaylistTitle, SearchAndCardContainer, SearchInput, SvgAddSongContainer, Table } from "./styles";
import { albumFetch } from "../../service/getAlbumFetch";
import { FaMusic } from "react-icons/fa";
import { IoMdClose } from "react-icons/io";


import { BsFillPlusCircleFill } from "react-icons/bs";
import { createPlaylistMutate } from "../../service/createPlaylistMutate";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

const playlistSchema = z.object({
    playlistName: z.string().min(3, "O nome do artista deve conter no mínimo 3 caracteres."),
});


type CreatePlaylistSchema = z.infer<typeof playlistSchema>;

export interface playlistSongInterface {
    "@key": string
}


export default function Playlist() {
    const { id } = useParams<{ id: string }>();
    const [searchTerm, setSearchTerm] = useState<string>("");
    const navigate = useNavigate()
    const [playlistSongs, setPlaylistSongs] = useState<playlistSongInterface[]>([]);
    const { data: songsData } = songFetch()
    const { data: albumsData } = albumFetch()
    const { data: playlistData, isLoading } = playlistAsset(id!)
    const { mutate: createPlaylist, isSuccess: playlistCreated, data: playlistResponse } = createPlaylistMutate()

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<CreatePlaylistSchema>({
        resolver: zodResolver(playlistSchema),
    });


    const filteredSongs = searchTerm !== "" && songsData?.filter(song =>
        song.name.toLowerCase().includes(searchTerm.toLowerCase())
    );


    function handleCreatePlaylist(data: CreatePlaylistSchema) {
        createPlaylist({
            playlistData: {
                arrayOfsongs: playlistSongs,
                name: data.playlistName
            }
        })
    }


    useEffect(() => {
        if (playlistCreated && playlistResponse) {
            reset()
            navigate(`/playlist/${playlistResponse["@key"]}`)
        }
    }, [playlistCreated, playlistResponse])


    function handleAddPlaylistSongs(data: playlistSongInterface) {
        const filteredSong = playlistSongs.find((song) => song["@key"] === data["@key"])
        if (!filteredSong) {
            setPlaylistSongs((prev) => [...prev, data])
        }
    }
    function handleRemovePlaylistSongs(data: playlistSongInterface) {
        const filteredSong = playlistSongs.filter((song) => song["@key"] !== data["@key"])
        setPlaylistSongs(filteredSong)
    }


    return (
        <PlaylistContainer>
            <SideBar />
            {id !== "1" ?
                <PlaylistContent>
                    {isLoading ? <>Carregando..</> :
                        <NameAndContent>
                            <PlaylistTitle>{playlistData?.name}</PlaylistTitle>
                            <SearchAndCardContainer>

                                <SearchInput
                                    type="text"
                                    placeholder="Pesquisar por música..."
                                    value={searchTerm}
                                    onChange={(e: ChangeEvent<HTMLInputElement>) => setSearchTerm(e.target.value)}
                                />
                                <CardContainer>
                                    {filteredSongs && filteredSongs.length > 0 ? (
                                        filteredSongs.map((song) => {
                                            const albumDetails = albumsData?.find(
                                                (album) => album["@key"] === song.album["@key"]
                                            );
                                            return (
                                                <Card key={song["@key"]}>
                                                    <h3>{song.name}</h3>
                                                    <p>{albumDetails ? albumDetails.name : "Álbum não encontrado"}</p>
                                                    <FaMusic />
                                                </Card>
                                            );
                                        })
                                    ) : (
                                        <p>Nenhuma música encontrada.</p>
                                    )}
                                </CardContainer>
                            </SearchAndCardContainer>
                            <Table>
                                <thead>
                                    <tr>
                                        <th>Título</th>
                                        <th>Álbum</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {playlistData &&
                                        playlistData.songs.map((song) => {
                                            const songDetails = songsData?.find((s) => s["@key"] === song["@key"]);
                                            const albumDetails = albumsData?.find(
                                                (album) => album["@key"] === songDetails?.album["@key"]
                                            );

                                            return (
                                                <tr key={song["@key"]}>
                                                    <td>{songDetails ? songDetails.name : "Nome não encontrado"}</td>
                                                    <td>{albumDetails ? albumDetails.name : "Álbum não encontrado"}</td>
                                                    <td>
                                                        <FaMusic />
                                                    </td>
                                                </tr>
                                            );
                                        })}
                                </tbody>
                            </Table>
                        </NameAndContent>
                    }
                </PlaylistContent>
                :
                <CreatePlaylistContainer onSubmit={handleSubmit(handleCreatePlaylist)}>
                    <LabelAndInputContainter>
                        <label htmlFor="name">Digite o Nome da sua playlist</label>
                        <NameInput type="text" id="name" {...register("playlistName")} />
                    </LabelAndInputContainter>

                    <SearchAndCardContainer>

                        <SearchInput
                            type="text"
                            placeholder="Pesquisar por música..."
                            value={searchTerm}
                            onChange={(e: ChangeEvent<HTMLInputElement>) => setSearchTerm(e.target.value)}
                        />
                        <CardContainer>
                            {filteredSongs && filteredSongs.length > 0 ? (
                                filteredSongs.map((song) => {
                                    const albumDetails = albumsData?.find(
                                        (album) => album["@key"] === song.album["@key"]
                                    );
                                    return (
                                        <AddMusicaCard key={song["@key"]}>
                                            <h3>{song.name}</h3>
                                            <p>{albumDetails ? albumDetails.name : "Álbum não encontrado"}</p>
                                            <SvgAddSongContainer
                                                onClick={() => handleAddPlaylistSongs({ "@key": song["@key"] })}
                                            >
                                                <BsFillPlusCircleFill
                                                />
                                            </SvgAddSongContainer>
                                        </AddMusicaCard>
                                    );
                                })
                            ) : (
                                <p>Nenhuma música encontrada.</p>
                            )}
                        </CardContainer>
                    </SearchAndCardContainer>

                    <Table>
                        <thead>
                            <tr>
                                <th>Título</th>
                                <th>Álbum</th>
                            </tr>
                        </thead>
                        <tbody>
                            {playlistSongs &&
                                playlistSongs.map((song) => {
                                    const songDetails = songsData?.find((s) => s["@key"] === song["@key"]);
                                    const albumDetails = albumsData?.find(
                                        (album) => album["@key"] === songDetails?.album["@key"]
                                    );

                                    return (
                                        <tr key={song["@key"]}>
                                            <td>{songDetails ? songDetails.name : "Nome não encontrado"}</td>
                                            <td>{albumDetails ? albumDetails.name : "Álbum não encontrado"}</td>
                                            <td>
                                                <SvgAddSongContainer
                                                    onClick={() => handleRemovePlaylistSongs({ "@key": song["@key"] })}
                                                >
                                                    <IoMdClose size={20} />
                                                </SvgAddSongContainer>
                                            </td>
                                        </tr>
                                    );
                                })}
                        </tbody>
                    </Table>
                    <CreatePlaylistButton
                        type="submit"
                    >Criar</CreatePlaylistButton>
                </CreatePlaylistContainer>
            }
        </PlaylistContainer>
    )
}