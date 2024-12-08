import axios from "axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export interface CreateArtistDetails {
    name: string;
    country: string;
}

async function postData(artistData: CreateArtistDetails) {
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
                    "@assetType": "artist",
                    name: artistData.name,
                    country: artistData.country,
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

export function createArtistMutate() {
    const queryClient = useQueryClient();

    const mutate = useMutation({
        mutationFn: ({ artistData }: { artistData: CreateArtistDetails }) =>
            postData(artistData),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["artists-info"] });
        },
    });

    return mutate;
}