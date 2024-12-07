import axios from "axios";
import { useQuery } from "@tanstack/react-query";

interface AlbumResponse {
    "@assetType": "album";
    "@key": string;
    "@lastTouchBy": string;
    "@lastTx": string;
    "@lastUpdated": string;
    artist: {
        "@assetType": "artist";
        "@key": string;
    };
    name: string;
    year: number;
}

async function fetchAlbumData() {
    const response = await axios.post(
        `http://ec2-54-91-215-149.compute-1.amazonaws.com/api/query/search`,
        {
            query: {
                selector: {
                    "@assetType": "album",
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

export function albumFetch() {
    return useQuery<AlbumResponse[]>({
        queryKey: ["album-info"],
        queryFn: () => fetchAlbumData(),
    });
}
