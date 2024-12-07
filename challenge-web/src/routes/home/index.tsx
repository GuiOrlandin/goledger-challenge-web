import { useState } from "react";
import SideBar from "../../components/sideBar";
import { ButtonsOptionContainer, CardListContainer, HomeContaienr, HomeContent, HomeMain, OptionButton, PaginationContainer } from "./styles";
import CardModel from "../../components/CardModel";
import { albumFetch } from "../../service/getAlbumFetch";



export default function Home() {

    const { data, isLoading } = albumFetch()
    const [currentPage, setCurrentPage] = useState(1);
    const limit = 12;

    const startIndex = (currentPage - 1) * limit;
    const endIndex = startIndex + limit;
    const paginatedItems = data?.slice(startIndex, endIndex);
    const totalPages = data ? Math.ceil(data.length / limit) : 0;
    const pages = Array.from({ length: totalPages }, (_, index) => index + 1);

    console.log(pages)



    const [seletecButton, setSeletecButton] = useState<string>("")
    return (
        <HomeContaienr>
            <SideBar />
            <HomeMain>
                <ButtonsOptionContainer>
                    <OptionButton
                        $isActive={seletecButton === "all"}
                        onClick={() => setSeletecButton("all")}
                    >Tudo</OptionButton>
                    <OptionButton
                        onClick={() => setSeletecButton("music")}
                    >Musica</OptionButton>
                    <OptionButton
                        $isActive={seletecButton === "artist"}
                        onClick={() => setSeletecButton("artist")}
                    >Artista</OptionButton>
                </ButtonsOptionContainer>

                {seletecButton === "all" &&
                    <HomeContent>
                        <h2>
                            Novidades
                        </h2>

                        <CardListContainer>
                            {paginatedItems?.map((album) => (
                                <CardModel key={album["@key"]} type="album" data={album} />
                            ))}
                        </CardListContainer>

                        <PaginationContainer>
                            {pages.map(page => (
                                <OptionButton
                                    key={page}
                                    onClick={() => setCurrentPage(page)}
                                    $isActive={currentPage === page}
                                >
                                    {page}
                                </OptionButton>
                            ))}
                        </PaginationContainer>
                    </HomeContent>
                }
            </HomeMain>
        </HomeContaienr>
    )
} 