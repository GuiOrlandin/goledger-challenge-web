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

const artistSchema = z.object({
    artistName: z.string().min(3, "O nome do artista deve conter no mínimo 3 caracteres."),
    country: z.string().min(2, "O país deve conter no mínimo 2 caracteres."),
});

const albumSchema = z.object({
    albumName: z.string().min(3, "O nome do álbum deve conter no mínimo 3 caracteres."),
    artistNameInAlbum: z.string().min(3, "O artista da música deve conter no mínimo 3 caracteres."),
    yearOfAlbum: z.number().min(1900, "O ano deve ser no mínimo 1900.").max(new Date().getFullYear(), "Ano inválido."),
});

const songSchema = z.object({
    songName: z.string().min(3, "O nome da música deve conter no mínimo 3 caracteres."),
    artistOfSong: z.string().min(3, "O artista da música deve conter no mínimo 3 caracteres."),
    albumOfSong: z.string().min(3, "O nome do álbum deve conter no mínimo 3 caracteres."),
});



export default function CreateItemDialog() {
    const [open, setOpen] = useState<boolean>(false);
    const [selectedButton, setSelectedButton] = useState<string>("artist");
    const { mutate: createArtist, isSuccess: artistCreated } = createArtistMutate()

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
    }


    useEffect(() => {
        if (artistCreated) {
            reset()
            setOpen(false)
        }
    }, [
        artistCreated
    ])

    return (
        <Dialog.Root open={open}>
            <Dialog.Trigger asChild>
                <CreateItemButton onClick={() => setOpen(true)}>
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
                                    {errors.country && <ErrorMessage>{errors.country.message}</ErrorMessage>}
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
                                    {errors.yearOfAlbum && <ErrorMessage>{errors.yearOfAlbum.message}</ErrorMessage>}
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
                                    {errors.albumOfSong && <ErrorMessage>{errors.albumOfSong.message}</ErrorMessage>}
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
        </Dialog.Root>
    );
}
