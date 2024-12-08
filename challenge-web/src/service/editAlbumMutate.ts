import axios from "axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export interface EditAlbumDetails {
    key: string;
    year: string;
}

async function putData(albumData: EditAlbumDetails) {
    console.log(albumData)

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
                "@assetType": "album",
                "@key": albumData.key,
                year: albumData.year
            }
        };

        const response = await axios.put(
            "http://ec2-54-91-215-149.compute-1.amazonaws.com/api/invoke/updateAsset",
            requestBody,
            config
        );

        return response.data;
    } catch (error) {
        throw new Error("Falha ao editar o álbum");
    }
}

export function editAlbumMutate() {
    const queryClient = useQueryClient();

    const mutate = useMutation({
        mutationFn: ({ albumData }: { albumData: EditAlbumDetails }) =>
            putData(albumData),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["albuns-info"] });
        },
    });

    return mutate;
}