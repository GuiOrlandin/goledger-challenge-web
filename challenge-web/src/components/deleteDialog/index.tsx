import * as Dialog from "@radix-ui/react-dialog";
import { useEffect, useState } from "react";

import { MdDelete } from "react-icons/md";


import {
    ButtonsOfDialogContainer,
    CancelButton,
    ConfirmButton,
    Content,
    DeleteButton,
    DialogDeleteCommentContainer,
    DialogTitle,
    DialogTrigger,
    Overlay,
} from "./styles";
import { deleteArtistMutate } from "../../service/deleteItemMutate";
import { AlbumResponse } from "../../service/getAlbumFetch";
import { ArtistResponse } from "../../service/getArtistFetch";
import { PlaylistResponse } from "../../service/getPlaylistFetch";
import { SongResponse } from "../../service/getSongFetch";


interface DeleteDialogProps {
    title: string;
    data: AlbumResponse | ArtistResponse | PlaylistResponse | SongResponse
    deleted?: (value: boolean) => void;
}

export default function DeleteDialog({
    title,
    data,
    deleted
}: DeleteDialogProps) {
    const [open, setOpen] = useState(false);
    const { mutate: deleteArtist, isSuccess: artistDeleted } = deleteArtistMutate()


    function handleDeleteItem() {
        deleteArtist(
            {
                deleteItemData: {
                    key: data["@key"],
                    type: data["@assetType"]
                }
            }
        )
    }

    useEffect(() => {

        if (artistDeleted) {
            if (deleted) {
                deleted(artistDeleted)
            }

            setOpen(false)
        }
    }, [artistDeleted])

    return (
        <Dialog.Root open={open} onOpenChange={setOpen}>
            <DialogTrigger onClick={() => setOpen(true)} asChild>
                <DeleteButton>
                    <MdDelete size={20} />
                </DeleteButton>
            </DialogTrigger>
            <Dialog.Portal>
                <Overlay />
                <Content>
                    <DialogTitle>{title}</DialogTitle>
                    <DialogDeleteCommentContainer>
                        <ButtonsOfDialogContainer>
                            <ConfirmButton
                                onClick={() => {
                                    handleDeleteItem();
                                }}
                            >
                                Confirmar
                            </ConfirmButton>
                            <CancelButton>Cancelar</CancelButton>
                        </ButtonsOfDialogContainer>
                    </DialogDeleteCommentContainer>
                </Content>
            </Dialog.Portal>
        </Dialog.Root>
    );
}