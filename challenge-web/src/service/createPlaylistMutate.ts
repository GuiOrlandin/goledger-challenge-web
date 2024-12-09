import axios from "axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { playlistSongInterface } from "../routes/playlist";
import { PlaylistResponse } from "./getPlaylistFetch";

export interface CreatePlaylistDetails {
    name: string;
    arrayOfsongs: playlistSongInterface[];
}

async function postData(playlistData: CreatePlaylistDetails) {
    try {
        const token = btoa(`psAdmin:goledger`);

        const config = {
            headers: {
                Authorization: `Basic ${token}`,
                "Content-Type": "application/json",
            },
        };

        const requestBody = {
            asset: [
                {
                    "@assetType": "playlist",
                    name: playlistData.name,
                    songs: playlistData.arrayOfsongs,
                    private: false,
                },
            ],
        };

        const response = await axios.post(
            "http://ec2-54-91-215-149.compute-1.amazonaws.com/api/invoke/createAsset",
            requestBody,
            config
        );

        return response.data[0] as PlaylistResponse;
    } catch (error) {
        throw new Error("Falha ao criar a playlist");
    }
}

export function createPlaylistMutate() {
    const queryClient = useQueryClient();

    const mutate = useMutation({
        mutationFn: ({ playlistData }: { playlistData: CreatePlaylistDetails }) =>
            postData(playlistData),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["artists-info"] });
        },
    });

    return mutate;
}