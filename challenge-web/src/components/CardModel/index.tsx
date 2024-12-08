import { useState } from "react";


import { CardContainer, HoveredButtonsContainer, InfoRow, Label, NameAndSvgIconContainer, Title, Value } from "./styles";

import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { AlbumResponse } from "../../service/getAlbumFetch";
import { ArtistResponse } from "../../service/getArtistFetch";
import { SongResponse } from "../../service/getSongFetch";
import { FaCompactDisc, FaListUl, FaMusic, FaUser } from "react-icons/fa";
import { PlaylistResponse } from "../../service/getPlaylistFetch";

import EditItemDialog from "../editItem";
import DeleteDialog from "../deleteDialog";


interface CardModelProps {
    data: SongResponse | AlbumResponse | ArtistResponse | PlaylistResponse
}

export default function CardModel({ data }: CardModelProps) {
    const [isHovered, setIsHovered] = useState(false);
    function formatDate(dateString: string): string {
        const date = new Date(dateString);
        return format(date, "dd 'de' MMMM 'de' yyyy", { locale: ptBR });
    }



    return (
        <CardContainer onMouseOver={() => setIsHovered(true)}
            onMouseOut={() => setIsHovered(false)}>
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
                            {isHovered ?
                                <HoveredButtonsContainer>
                                    <EditItemDialog type="artist" InitalData={data} />
                                    <DeleteDialog title="Deseja deletar o artista?"
                                        data={data}
                                    />
                                </HoveredButtonsContainer>
                                :
                                <FaUser />
                            }
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
                                {isHovered ?
                                    <HoveredButtonsContainer>
                                        <EditItemDialog type="album" InitalData={data} />
                                        <DeleteDialog title="Deseja deletar o album?"
                                            data={data}
                                        />
                                    </HoveredButtonsContainer>
                                    :
                                    <FaCompactDisc />
                                }
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
                                {isHovered ?
                                    <HoveredButtonsContainer>
                                        <DeleteDialog title="Deseja deletar a música?"
                                            data={data}
                                        />
                                    </HoveredButtonsContainer>
                                    :
                                    <FaMusic />
                                }
                            </NameAndSvgIconContainer>
                        }
                        <InfoRow>
                            <Label>Criada em:</Label>
                            <Value>{formatDate(data["@lastUpdated"])}</Value>
                        </InfoRow>
                    </>
                )
            }
        </CardContainer >
    );
};


