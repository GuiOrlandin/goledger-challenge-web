import axios from "axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export interface CreateSongDetails {
    name: string;
    artist: string;
    album: string;
}

async function postData(songData: CreateSongDetails) {
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
                    "@assetType": "song",
                    "album": {
                        "@assetType": "album",
                        name: songData.album,
                        "artist": {
                            "@assetType": "artist",
                            name: songData.artist,
                        },
                    },

                    name: songData.name,
                },
            ],
        };

        const response = await axios.post(
            "http://ec2-54-91-215-149.compute-1.amazonaws.com/api/invoke/createAsset",
            requestBody,
            config
        );

        return response.data;
    } catch (error) {
        throw new Error("Falha ao criar a música: é necessário que o artista e o álbum existam");
    }
}

export function createSongMutate() {
    const queryClient = useQueryClient();

    const mutate = useMutation({
        mutationFn: ({ songData }: { songData: CreateSongDetails }) =>
            postData(songData),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["songs-info"] });
        },
    });

    return mutate;
}