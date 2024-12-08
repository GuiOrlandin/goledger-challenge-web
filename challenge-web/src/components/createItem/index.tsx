import { useState } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import {
    CloseAndSaveChangesButtonsContainer,
    CloseButton,
    Content,
    CreateItemButton,
    DescriptionContainer,
    ErrorMessage,
    FormOfCreateOrEditItem,
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

const artistSchema = z.object({
    name: z.string().min(3, "O nome do artista deve conter no mínimo 3 caracteres."),
    country: z.string().min(2, "O país deve conter no mínimo 2 caracteres."),
});

const albumSchema = z.object({
    name: z.string().min(3, "O nome do álbum deve conter no mínimo 3 caracteres."),
    artist: z.string().min(3, "O artista da música deve conter no mínimo 3 caracteres."),
    year: z.number().min(1900, "O ano deve ser no mínimo 1900.").max(new Date().getFullYear(), "Ano inválido."),
});

const songSchema = z.object({
    name: z.string().min(3, "O nome da música deve conter no mínimo 3 caracteres."),
    artist: z.string().min(3, "O artista da música deve conter no mínimo 3 caracteres."),
    album: z.string().min(3, "O nome do álbum deve conter no mínimo 3 caracteres."),
});



export default function CreateItemDialog() {
    const [open, setOpen] = useState<boolean>(false);
    const [selectedButton, setSelectedButton] = useState<string>("artist");

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
        console.log(`Dados do item criado (${selectedButton}):`, data);
        reset();
        setOpen(false);
    }

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
                                <label>Nome do Artista</label>
                                <input
                                    placeholder="Digite o nome do artista"
                                    {...register("name")}
                                />
                                {errors.name && <ErrorMessage>{errors.name.message}</ErrorMessage>}

                                <label>Nacionalidade</label>
                                <input
                                    placeholder="Digite a nacionalidade"
                                    {...register("country")}
                                />
                                {errors.country && <ErrorMessage>{errors.country.message}</ErrorMessage>}
                            </>
                        )}
                        {selectedButton === "album" && (
                            <>
                                <label>Nome do Álbum</label>
                                <input
                                    placeholder="Digite o nome do álbum"
                                    {...register("name")}
                                />
                                {errors.name && <ErrorMessage>{errors.name.message}</ErrorMessage>}

                                <label>Artista</label>
                                <input
                                    placeholder="Digite o nome do artista"
                                    {...register("artist")}
                                />
                                {errors.artist && (
                                    <ErrorMessage>{errors?.artist.message}</ErrorMessage>
                                )}

                                <label>Ano de Lançamento</label>
                                <input
                                    type="number"
                                    placeholder="Digite o ano"
                                    {...register("year", { valueAsNumber: true })}
                                />
                                {errors.year && <ErrorMessage>{errors.year.message}</ErrorMessage>}
                            </>
                        )}
                        {selectedButton === "song" && (
                            <>
                                <label>Nome da Música</label>
                                <input
                                    placeholder="Digite o nome da música"
                                    {...register("name")}
                                />
                                {errors.name && <ErrorMessage>{errors.name.message}</ErrorMessage>}

                                <label>Artista</label>
                                <input
                                    placeholder="Digite o nome do artista"
                                    {...register("artist")}
                                />
                                {errors.artist && (
                                    <ErrorMessage>{errors.artist.message}</ErrorMessage>
                                )}

                                <label>Album</label>
                                <input
                                    placeholder="Digite o album que a música faz parte"
                                    {...register("duration")}
                                />
                                {errors.duration && <ErrorMessage>{errors.duration.message}</ErrorMessage>}
                            </>
                        )}
                        <CloseAndSaveChangesButtonsContainer>
                            <SaveButton>Criar</SaveButton>
                            <CloseButton onClick={() => setOpen(false)}>Fechar</CloseButton>
                        </CloseAndSaveChangesButtonsContainer>
                    </FormOfCreateOrEditItem>
                </Content>
            </Dialog.Portal>
        </Dialog.Root>
    );
}
