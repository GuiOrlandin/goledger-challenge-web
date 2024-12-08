import { useEffect, useState } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import {
    CloseAndSaveChangesButtonsContainer,
    CloseButton,
    Content,
    DescriptionContainer,
    EditItemButton,
    ErrorMessage,
    FormOfCreateOrEditItem,
    LabelAndInputContainer,
    Overlay,
    SaveButton,
    Title,
} from "./styles";

import { useForm, FieldValues } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { CiEdit } from "react-icons/ci";
import { SongResponse } from "../../service/getSongFetch";
import { AlbumResponse } from "../../service/getAlbumFetch";
import { ArtistResponse } from "../../service/getArtistFetch";
import { PlaylistResponse } from "../../service/getPlaylistFetch";
import { editArtistMutate } from "../../service/editArtistMutate";
import { editAlbumMutate } from "../../service/editAlbumMutate";

const artistSchema = z.object({
    artistName: z.string().min(3, "O nome do artista deve conter no mínimo 3 caracteres."),
    country: z.string().min(2, "O país deve conter no mínimo 2 caracteres."),
});

const albumSchema = z.object({
    albumName: z.string().min(3, "O nome do álbum deve conter no mínimo 3 caracteres."),
    yearOfAlbum: z.number().min(1900, "O ano deve ser no mínimo 1900.").max(new Date().getFullYear(), "Ano inválido.").transform((val) => val.toString()),
});


interface EditItemDialogProps {
    type: 'artist' | 'album';
    InitalData: AlbumResponse | ArtistResponse | PlaylistResponse
}


export default function EditItemDialog({ type, InitalData }: EditItemDialogProps) {
    const [open, setOpen] = useState<boolean>(false);
    const { mutate: editArtis, isSuccess: artistEdited, error: editArtistRequestError } = editArtistMutate()
    const { mutate: editAlbum, isSuccess: albumEdited, error: editAlbumRequestError } = editAlbumMutate()

    const schemaMap = {
        artist: artistSchema,
        album: albumSchema,
    };


    const selectedSchema = schemaMap[type as keyof typeof schemaMap];


    const defaultValues = {
        artist: {
            artistName: InitalData.name,
            country: (InitalData as ArtistResponse).country,
        },
        album: {
            albumName: InitalData.name,
            artistNameInAlbum: (InitalData as AlbumResponse).artist,
            yearOfAlbum: (InitalData as AlbumResponse).year,
        },
    }


    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<FieldValues>({
        resolver: zodResolver(selectedSchema),
        defaultValues: defaultValues[type],
    });

    function handleEditItem(data: FieldValues) {
        console.log(data)

        if (type === "artist") {
            editArtis({
                artistData: {
                    country: data.country,
                    key: InitalData["@key"],
                }
            })
        }
        if (type === "album") {
            editAlbum({
                albumData: {
                    year: data.yearOfAlbum,
                    key: InitalData["@key"]
                }
            })
        }
    }


    useEffect(() => {
        if (artistEdited || albumEdited) {
            reset()
            setOpen(false)
        }
    }, [
        artistEdited, albumEdited
    ])


    return (
        <Dialog.Root open={open}>
            <Dialog.Trigger asChild>
                <EditItemButton onClick={() => setOpen(true)}>
                    <CiEdit size={20} />
                </EditItemButton>
            </Dialog.Trigger>
            <Dialog.Portal>
                <Overlay />
                <Content>
                    <Title>Edite seu item</Title>
                    <DescriptionContainer>
                        Complete e confirme para editar seu item
                    </DescriptionContainer>
                    <FormOfCreateOrEditItem onSubmit={handleSubmit(handleEditItem)}>
                        {type === "artist" && (
                            <>
                                <LabelAndInputContainer>
                                    <label>Nome do Artista</label>
                                    <input
                                        disabled={true}
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
                                    {errors.country &&
                                        !editArtistRequestError &&
                                        <ErrorMessage>{errors.country.message}</ErrorMessage>}
                                    {editArtistRequestError && < ErrorMessage > {editArtistRequestError.message}</ErrorMessage>}
                                </LabelAndInputContainer>
                            </>
                        )}
                        {type === "album" && (
                            <>
                                <LabelAndInputContainer>

                                    <label>Nome do Álbum</label>
                                    <input
                                        placeholder="Digite o nome do álbum"
                                        {...register("albumName")}
                                        disabled={true}
                                    />
                                    {errors.albumName && <ErrorMessage>{errors.albumName.message}</ErrorMessage>}
                                </LabelAndInputContainer>
                                <LabelAndInputContainer>
                                    <label>Ano de Lançamento</label>
                                    <input
                                        type="number"
                                        placeholder="Digite o ano"
                                        {...register("yearOfAlbum", { valueAsNumber: true })}
                                    />
                                    {errors.yearOfAlbum &&
                                        !editAlbumRequestError &&
                                        <ErrorMessage>{errors.yearOfAlbum.message}</ErrorMessage>}
                                    {editAlbumRequestError && (
                                        <ErrorMessage>{editAlbumRequestError.message}</ErrorMessage>
                                    )}
                                </LabelAndInputContainer>
                            </>
                        )}
                        <CloseAndSaveChangesButtonsContainer>
                            <SaveButton
                                type="submit"
                            >Salvar</SaveButton>
                            <CloseButton onClick={() => setOpen(false)}>Fechar</CloseButton>
                        </CloseAndSaveChangesButtonsContainer>
                    </FormOfCreateOrEditItem>
                </Content>
            </Dialog.Portal>
        </Dialog.Root >
    );
}
