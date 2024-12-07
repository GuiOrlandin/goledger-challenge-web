import { CardContainer, InfoRow, Label, Title, Value } from "./styles";

import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

interface PlaylistData {
    name: string;
    author: string;
    lastUpdated: string;
};

interface MusicData {
    name: string;
    author: string;
    album: string;
};

interface AlbumData {
    name: string;
    author: string;
    year: string;
};

interface CardModelProps {
    type: string,
    data: PlaylistData | MusicData | AlbumData
}

export default function CardModel({ type, data }: CardModelProps) {
    function formatDate(dateString: string): string {
        const date = new Date(dateString);
        return format(date, "dd 'de' MMMM 'de' yyyy", { locale: ptBR });
    }

    return (
        <CardContainer>
            <Title>{data.name}</Title>
            <InfoRow>
                <Label>Autor:</Label>
                <Value>{data.author}</Value>
            </InfoRow>
            {type === "playlist" && "lastUpdated" in data && (
                <InfoRow>
                    <Label>Última atualização:</Label>
                    <Value>{formatDate(data.lastUpdated)}</Value>
                </InfoRow>
            )}
            {type === "music" && "album" in data && (
                <InfoRow>
                    <Label>Álbum:</Label>
                    <Value>{data.album}</Value>
                </InfoRow>
            )}
            {type === "album" && "year" in data && (
                <InfoRow>
                    <Label>Ano:</Label>
                    <Value>{data.year}</Value>
                </InfoRow>
            )}
        </CardContainer>
    );
};


