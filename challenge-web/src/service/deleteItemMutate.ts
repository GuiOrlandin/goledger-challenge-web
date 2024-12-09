import axios from "axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";

interface DeleteItemProps {
    type: string,
    key: string
}

async function deleteData(deleteItemData: DeleteItemProps) {

    try {
        const token = btoa(`psAdmin:goledger`);

        const config = {
            headers: {
                Authorization: `Basic ${token}`,
                "Content-Type": "application/json",
            },

            data: {
                key: {
                    "@assetType": deleteItemData.type,
                    "@key": deleteItemData.key,
                },
                cascade: true,
            },
        }



        const response = await axios.delete(
            "http://ec2-54-91-215-149.compute-1.amazonaws.com/api/invoke/deleteAsset",
            config
        );

        return response.data;
    }
    catch (error) {
        throw new Error("Falha ao editar o artista");
    }
}

export function deleteArtistMutate() {
    const queryClient = useQueryClient();

    const mutate = useMutation({
        mutationFn: ({ deleteItemData }: { deleteItemData: DeleteItemProps }) =>
            deleteData(deleteItemData),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["artists-info"] });
            queryClient.invalidateQueries({ queryKey: ["albuns-info"] });
            queryClient.invalidateQueries({ queryKey: ["playlist-info"] });
            queryClient.invalidateQueries({ queryKey: ["songs-info"] });
        },
    });

    return mutate;
}