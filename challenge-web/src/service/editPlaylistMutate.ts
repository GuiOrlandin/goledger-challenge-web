import axios from "axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { playlistSongInterface } from "../routes/playlist";

export interface EditPlaylistDetails {
    key: string;
    arrayOfsongs: playlistSongInterface[];
}

async function putData(playlistData: EditPlaylistDetails) {

    try {
        const token = btoa(`psAdmin:goledger`);

        const config = {
            headers: {
                Authorization: `Basic ${token}`,
                "Content-Type": "application/json",
            },
        };

        const requestBody = {
            update: {
                "@assetType": "playlist",
                "@key": playlistData.key,
                songs: playlistData.arrayOfsongs
            }
        };

        const response = await axios.put(
            "http://ec2-54-91-215-149.compute-1.amazonaws.com/api/invoke/updateAsset",
            requestBody,
            config
        );

        return response.data;
    } catch (error) {
        throw new Error("Falha ao editar a playlist");
    }
}

export function editPlaylistMutate() {
    const queryClient = useQueryClient();

    const mutate = useMutation({
        mutationFn: ({ playlistData }: { playlistData: EditPlaylistDetails }) =>
            putData(playlistData),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["playlist-info"] });
        },
    });

    return mutate;
}