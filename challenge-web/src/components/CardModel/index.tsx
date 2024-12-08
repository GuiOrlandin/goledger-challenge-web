import { CardContainer, InfoRow, Label, NameAndSvgIconContainer, Title, Value } from "./styles";

import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { AlbumResponse } from "../../service/getAlbumFetch";
import { ArtistResponse } from "../../service/getArtistFetch";
import { SongResponse } from "../../service/getSongFetch";
import { FaCompactDisc, FaListUl, FaMusic, FaUser } from "react-icons/fa";
import { PlaylistResponse } from "../../service/getPlaylistFetch";

interface CardModelProps {
    data: SongResponse | AlbumResponse | ArtistResponse | PlaylistResponse
}

export default function CardModel({ data }: CardModelProps) {
    function formatDate(dateString: string): string {
        const date = new Date(dateString);
        return format(date, "dd 'de' MMMM 'de' yyyy", { locale: ptBR });
    }

    return (
        <CardContainer>
            {data["@assetType"] === "playlist" && (
                <>
                    <NameAndSvgIconContainer>
                        <Title>{data.name}</Title>
                        <FaListUl />
                    </NameAndSvgIconContainer>
                    <InfoRow>
                        <Label>Última atualização:</Label>
                        <Value>{formatDate(data["@lastUpdated"])}</Value>
                    </InfoRow>
                </>
            )}
            {data["@assetType"] === "artist" && (
                <>
                    {data.name !== "" &&
                        <NameAndSvgIconContainer>
                            <Title>{data.name}</Title>
                            <FaUser />
                        </NameAndSvgIconContainer>
                    }
                    {data.country !== "" &&
                        <InfoRow>
                            <Label>Nacionalidade:</Label>
                            <Value>{data.country}</Value>
                        </InfoRow>
                    }
                </>
            )
            }
            {
                data["@assetType"] === "album" && "year" in data && (
                    <>
                        {data.name !== "" &&
                            <NameAndSvgIconContainer>
                                <Title>{data.name}</Title>
                                <FaCompactDisc />
                            </NameAndSvgIconContainer>
                        }
                        <InfoRow>
                            <Label>Ano:</Label>
                            <Value>{data.year}</Value>
                        </InfoRow>
                    </>
                )
            }
            {
                data["@assetType"] === "song" && "name" in data && (
                    <>
                        {data.name !== "" &&
                            <NameAndSvgIconContainer>
                                <Title>{data.name}</Title>
                                <FaMusic />
                            </NameAndSvgIconContainer>
                        }
                        <InfoRow>
                            <Label>Ano:</Label>
                            <Value>{formatDate(data["@lastUpdated"])}</Value>
                        </InfoRow>
                    </>
                )
            }
        </CardContainer >
    );
};


