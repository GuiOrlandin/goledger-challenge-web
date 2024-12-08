import axios from "axios";
import { useQuery } from "@tanstack/react-query";

export interface Song {
    "@assetType": "song";
    "@key": string;
}

export interface PlaylistResponse {
    "@assetType": "playlist";
    "@key": string;
    "@lastTouchBy": string;
    "@lastTx": string;
    "@lastUpdated": string;
    name: string;
    private: boolean;
    songs: Song[];
    type: string | undefined,
}

async function fetchPlaylistData() {
    const response = await axios.post(
        `http://ec2-54-91-215-149.compute-1.amazonaws.com/api/query/search`,
        {
            query: {
                selector: {
                    "@assetType": "playlist",
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

export function playlistFetch() {
    return useQuery<PlaylistResponse[]>({
        queryKey: ["playlist-info"],
        queryFn: () => fetchPlaylistData(),
    });
}
