import { useEffect, useState } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import {
    CloseAndSaveChangesButtonsContainer,
    CloseButton,
    Content,
    CreateItemButton,
    DescriptionContainer,
    ErrorMessage,
    FormOfCreateOrEditItem,
    LabelAndInputContainer,
    OptionButton,
    OptionsButtonContainer,
    Overlay,
    SaveButton,
    Title,
} from "./styles";

import { FaPlus } from "react-icons/fa";
import { useForm, FieldValues } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { createArtistMutate } from "../../service/createArtistMutate";
import { createAlbumMutate } from "../../service/createAlbumMutate";
import { createSongMutate } from "../../service/createSongMutate";

const artistSchema = z.object({
    artistName: z.string().min(3, "O nome do artista deve conter no mínimo 3 caracteres."),
    country: z.string().min(2, "O país deve conter no mínimo 2 caracteres."),
});

const albumSchema = z.object({
    albumName: z.string().min(3, "O nome do álbum deve conter no mínimo 3 caracteres."),
    artistNameInAlbum: z.string().min(3, "O artista da música deve conter no mínimo 3 caracteres."),
    yearOfAlbum: z.number().min(1900, "O ano deve ser no mínimo 1900.").max(new Date().getFullYear(), "Ano inválido.").transform((val) => val.toString()),
});

const songSchema = z.object({
    songName: z.string().min(3, "O nome da música deve conter no mínimo 3 caracteres."),
    artistOfSong: z.string().min(3, "O artista da música deve conter no mínimo 3 caracteres."),
    albumOfSong: z.string().min(3, "O nome do álbum deve conter no mínimo 3 caracteres."),
});



export default function CreateItemDialog() {
    const [open, setOpen] = useState<boolean>(false);
    const [selectedButton, setSelectedButton] = useState<string>("artist");
    const { mutate: createArtist, isSuccess: artistCreated, error: createArtistRequestError } = createArtistMutate()
    const { mutate: createAlbum, isSuccess: albumCreated, error: createAlbumRequestError } = createAlbumMutate()
    const { mutate: createSong, isSuccess: songCreated, error: createSongRequestError } = createSongMutate()

    const schemaMap = {
        artist: artistSchema,
        album: albumSchema,
        song: songSchema,
    };

    const selectedSchema = schemaMap[selectedButton as keyof typeof schemaMap];

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<FieldValues>({
        resolver: zodResolver(selectedSchema),
    });

    function handleCreateItem(data: FieldValues) {
        if (selectedButton === "artist") {
            createArtist({
                artistData: {
                    country: data.country,
                    name: data.artistName
                }
            })
        }
        if (selectedButton === "album") {
            createAlbum({
                albumData: {
                    artist: data.artistNameInAlbum,
                    name: data.albumName,
                    year: data.yearOfAlbum
                }
            })
        }
        if (selectedButton === "song") {
            createSong({
                songData: {
                    album: data.albumOfSong,
                    artist: data.artistOfSong,
                    name: data.songName,
                }
            })
        }
    }


    useEffect(() => {
        if (artistCreated || albumCreated || songCreated) {
            reset()
            setOpen(false)
        }
    }, [
        artistCreated, albumCreated, songCreated
    ])


    return (
        <Dialog.Root open={open}>
            <Dialog.Trigger asChild>
                <CreateItemButton onClick={() => setOpen(true)}>
                    Criar Item
                    <FaPlus />
                </CreateItemButton>
            </Dialog.Trigger>
            <Dialog.Portal>
                <Overlay />
                <Content>
                    <Title>Crie seu item</Title>
                    <DescriptionContainer>
                        Complete os campos para criar o seu item
                    </DescriptionContainer>
                    <OptionsButtonContainer>
                        <OptionButton
                            $isActive={selectedButton === "artist"}
                            onClick={() => setSelectedButton("artist")}
                        >
                            Artista
                        </OptionButton>
                        <OptionButton
                            $isActive={selectedButton === "album"}
                            onClick={() => setSelectedButton("album")}
                        >
                            Álbum
                        </OptionButton>
                        <OptionButton
                            $isActive={selectedButton === "song"}
                            onClick={() => setSelectedButton("song")}
                        >
                            Música
                        </OptionButton>
                    </OptionsButtonContainer>
                    <FormOfCreateOrEditItem onSubmit={handleSubmit(handleCreateItem)}>
                        {selectedButton === "artist" && (
                            <>
                                <LabelAndInputContainer>
                                    <label>Nome do Artista</label>
                                    <input
                                        placeholder="Digite o nome do artista"
                                        {...register("artistName")}
                                    />
                                    {errors.artistName && <ErrorMessage>{errors.artistName.message}</ErrorMessage>}
                                </LabelAndInputContainer>
                                <LabelAndInputContainer>
                                    <label>Nacionalidade</label>
                                    <input
                                        placeholder="Digite a nacionalidade"
                                        {...register("country")}
                                    />
                                    {errors.country && !createArtistRequestError && <ErrorMessage>{errors.country.message}</ErrorMessage>}
                                    {createArtistRequestError && < ErrorMessage > {createArtistRequestError.message}</ErrorMessage>}
                                </LabelAndInputContainer>
                            </>
                        )}
                        {selectedButton === "album" && (
                            <>
                                <LabelAndInputContainer>

                                    <label>Nome do Álbum</label>
                                    <input
                                        placeholder="Digite o nome do álbum"
                                        {...register("albumName")}
                                    />
                                    {errors.albumName && <ErrorMessage>{errors.albumName.message}</ErrorMessage>}
                                </LabelAndInputContainer>

                                <LabelAndInputContainer>
                                    <label>Artista</label>
                                    <input
                                        placeholder="Digite o nome do artista"
                                        {...register("artistNameInAlbum")}
                                    />
                                    {errors.artistNameInAlbum && (
                                        <ErrorMessage>{errors?.artistNameInAlbum.message}</ErrorMessage>
                                    )}
                                </LabelAndInputContainer>

                                <LabelAndInputContainer>
                                    <label>Ano de Lançamento</label>
                                    <input
                                        type="number"
                                        placeholder="Digite o ano"
                                        {...register("yearOfAlbum", { valueAsNumber: true })}
                                    />
                                    {errors.yearOfAlbum && !createAlbumRequestError && <ErrorMessage>{errors.yearOfAlbum.message}</ErrorMessage>}
                                    {createAlbumRequestError && (
                                        <ErrorMessage>{createAlbumRequestError.message}</ErrorMessage>
                                    )}
                                </LabelAndInputContainer>
                            </>
                        )}
                        {selectedButton === "song" && (
                            <>
                                <LabelAndInputContainer>
                                    <label>Nome da Música</label>
                                    <input
                                        placeholder="Digite o nome da música"
                                        {...register("songName")}
                                    />
                                    {errors.songName && <ErrorMessage>{errors.songName.message}</ErrorMessage>}
                                </LabelAndInputContainer>
                                <LabelAndInputContainer>

                                    <label>Artista</label>
                                    <input
                                        placeholder="Digite o nome do artista"
                                        {...register("artistOfSong")}
                                    />
                                    {errors.artistOfSong && (
                                        <ErrorMessage>{errors.artistOfSong.message}</ErrorMessage>
                                    )}
                                </LabelAndInputContainer>
                                <LabelAndInputContainer>
                                    <label>Album</label>
                                    <input
                                        placeholder="Digite o album que a música faz parte"
                                        {...register("albumOfSong")}
                                    />
                                    {errors.albumOfSong && !createSongRequestError && <ErrorMessage>{errors.albumOfSong.message}</ErrorMessage>}
                                    {createSongRequestError && (
                                        <ErrorMessage>{createSongRequestError.message}</ErrorMessage>
                                    )}
                                </LabelAndInputContainer>
                            </>
                        )}
                        <CloseAndSaveChangesButtonsContainer>
                            <SaveButton
                                type="submit"
                            >Criar</SaveButton>
                            <CloseButton onClick={() => setOpen(false)}>Fechar</CloseButton>
                        </CloseAndSaveChangesButtonsContainer>
                    </FormOfCreateOrEditItem>
                </Content>
            </Dialog.Portal>
        </Dialog.Root >
    );
}
