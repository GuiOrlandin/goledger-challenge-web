import axios from "axios";
import { useQuery } from "@tanstack/react-query";

export interface SongResponse {
    "@assetType": "song",
    "@key": string,
    "@lastTouchBy": string,
    "@lastTx": string,
    "@lastUpdated": string,
    album: {
        " @assetType": "album",
        "@key": string,
    },
    name: string;
    type: string | undefined,
}

async function fetchSongData() {
    const response = await axios.post(
        `http://ec2-54-91-215-149.compute-1.amazonaws.com/api/query/search`,
        {
            query: {
                selector: {
                    "@assetType": "song",
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

export function songFetch() {
    return useQuery<SongResponse[]>({
        queryKey: ["songs-info"],
        queryFn: () => fetchSongData(),
    });
}
