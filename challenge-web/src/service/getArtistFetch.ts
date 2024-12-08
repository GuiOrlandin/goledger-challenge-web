import axios from "axios";
import { useQuery } from "@tanstack/react-query";

export interface ArtistResponse {
    "@assetType": string;
    "@key": string;
    "@lastTouchBy": string;
    "@lastTx": string;
    "@lastUpdated": string;
    country: string;
    name: string;
    type: string | undefined,
}

async function fetchArtistData() {
    const response = await axios.post(
        `http://ec2-54-91-215-149.compute-1.amazonaws.com/api/query/search`,
        {
            query: {
                selector: {
                    "@assetType": "artist",
                },
            },
        },
        {
            auth: {
                username: "psAdmin",
                password: "goledger",
            },
        }
    );
    return response.data.result;
}

export function artistFetch() {
    return useQuery<ArtistResponse[]>({
        queryKey: ["artists-info"],
        queryFn: () => fetchArtistData(),
    });
}
