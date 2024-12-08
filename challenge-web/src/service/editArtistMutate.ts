import axios from "axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export interface EditArtistDetails {
    name: string;
    country: string;
}

async function putData(artistData: EditArtistDetails) {
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
                "@assetType": "artist",
                name: artistData.name,
                country: artistData.country,
            }
        };

        const response = await axios.put(
            "http://ec2-54-91-215-149.compute-1.amazonaws.com/api/invoke/updateAsset",
            requestBody,
            config
        );

        return response.data;
    } catch (error) {
        throw new Error("Falha ao criar artista");
    }
}

export function editArtistMutate() {
    const queryClient = useQueryClient();

    const mutate = useMutation({
        mutationFn: ({ artistData }: { artistData: EditArtistDetails }) =>
            putData(artistData),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["artists-info"] });
        },
    });

    return mutate;
}