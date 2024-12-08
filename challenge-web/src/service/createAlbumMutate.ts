import axios from "axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export interface CreateAlbumDetails {
    name: string;
    artist: string;
    year: string;
}

async function postData(albumData: CreateAlbumDetails) {
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
                    "@assetType": "album",
                    "artist": {
                        "@assetType": "artist",
                        name: albumData.artist,
                    },
                    name: albumData.name,
                    year: albumData.year
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
        throw new Error("Falha ao criar artista");
    }
}

export function createAlbumMutate() {
    const queryClient = useQueryClient();

    const mutate = useMutation({
        mutationFn: ({ albumData }: { albumData: CreateAlbumDetails }) =>
            postData(albumData),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["albuns-info"] });
        },
    });

    return mutate;
}