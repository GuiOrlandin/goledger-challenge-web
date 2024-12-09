import { useNavigate, useParams } from "react-router-dom";
import { ChangeEvent, useEffect, useState } from "react";

import SideBar from "../../components/sideBar";
import { songFetch } from "../../service/getSongFetch";
import { playlistAsset } from "../../service/readAsset";
import { ActionsButtonsContainer, AddMusicaCard, CardContainer, CreatePlaylistButton, CreatePlaylistContainer, DeleteItemButton, EditItemButton, ErrorMessage, HomeRedirectAndActionsButtonsContainer, HomeRedirectContainer, LabelAndInputContainter, NameAndContent, NameInput, PlaylistContainer, PlaylistContent, PlaylistTitle, SaveChangesInPlaylistButton, SearchAndCardContainer, SearchInput, SvgAddSongContainer, Table, TableContainer } from "./styles";
import { albumFetch } from "../../service/getAlbumFetch";
import { FaHome, FaMusic } from "react-icons/fa";
import { IoMdClose } from "react-icons/io";


import { BsFillPlusCircleFill } from "react-icons/bs";
import { createPlaylistMutate } from "../../service/createPlaylistMutate";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import DeleteDialog from "../../components/deleteDialog";
import { CiEdit } from "react-icons/ci";
import { editPlaylistMutate } from "../../service/editPlaylistMutate";

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
    const [isEditingSongs, setIsEditingSongs] = useState<boolean>(false)
    const [isDeleted, setIsDeleted] = useState<boolean>(false)
    const navigate = useNavigate()
    const [playlistSongs, setPlaylistSongs] = useState<playlistSongInterface[]>([]);
    const { data: songsData } = songFetch()
    const { data: albumsData } = albumFetch()
    const { data: playlistData, isLoading } = playlistAsset(id!)
    const { mutate: createPlaylist, data: playlistResponse, error } = createPlaylistMutate()
    const { mutate: editPlaylist, isSuccess: playlistEdited, } = editPlaylistMutate()

    const {
        register,
        handleSubmit,
        reset,
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
    function handleEditPlaylist() {
        if (playlistData) {
            editPlaylist({
                playlistData: {
                    arrayOfsongs: playlistSongs,
                    key: playlistData?.["@key"]
                }
            })
        }
    }


    useEffect(() => {
        if (playlistResponse) {
            reset()
            navigate(`/playlist/${playlistResponse["@key"]}`)
        }
        if (playlistEdited && playlistData) {
            setPlaylistSongs([])
            setIsEditingSongs(false)
            navigate(0)
        }
    }, [playlistEdited, playlistData, playlistResponse])

    useEffect(() => {
        if (playlistData && playlistData?.songs.length >= 1) {
            setPlaylistSongs(playlistData?.songs)
        }
    }, [playlistData])

    if (isDeleted) {
        navigate(`/`)
    }



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
            {id !== "createPlaylist" ?
                <PlaylistContent>
                    <HomeRedirectAndActionsButtonsContainer>

                        <HomeRedirectContainer
                            onClick={() => navigate("/")}
                        ><FaHome size={24} /></HomeRedirectContainer>
                        {playlistData &&
                            <ActionsButtonsContainer>
                                <EditItemButton onClick={() => setIsEditingSongs(true)}>
                                    <CiEdit size={22} />
                                </EditItemButton>
                                <DeleteItemButton>
                                    <DeleteDialog title="Deseja deletar a playlist?"
                                        data={playlistData}
                                        deleted={(value: boolean) => setIsDeleted(value)}
                                    />
                                </DeleteItemButton>
                            </ActionsButtonsContainer>
                        }
                    </HomeRedirectAndActionsButtonsContainer>

                    {isLoading ? <>Carregando..</> :
                        <NameAndContent>
                            <PlaylistTitle>{playlistData?.name}</PlaylistTitle>
                            {isEditingSongs ? <>
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
                                                            onClick={() => { handleAddPlaylistSongs({ "@key": song["@key"] }), setSearchTerm("") }}
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
                                <TableContainer>
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
                                </TableContainer>
                                <SaveChangesInPlaylistButton
                                    onClick={() => handleEditPlaylist()}
                                >Salvar</SaveChangesInPlaylistButton>
                            </>
                                :
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
                            }
                        </NameAndContent>
                    }
                </PlaylistContent>
                :
                <CreatePlaylistContainer onSubmit={handleSubmit(handleCreatePlaylist)}>
                    <HomeRedirectContainer
                        onClick={() => navigate("/")}
                    ><FaHome size={24} /></HomeRedirectContainer>
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
                                                onClick={() => { handleAddPlaylistSongs({ "@key": song["@key"] }), setSearchTerm("") }}
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

                    <TableContainer>
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
                            {error &&
                                <ErrorMessage>
                                    Já existe uma playlist com este nome!
                                </ErrorMessage>
                            }
                        </Table>
                    </TableContainer>
                    <CreatePlaylistButton
                        type="submit"
                    >Criar</CreatePlaylistButton>
                </CreatePlaylistContainer>
            }
        </PlaylistContainer >
    )
}