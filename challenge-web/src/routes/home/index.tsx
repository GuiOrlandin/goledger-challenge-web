import { useState } from "react";
import SideBar from "../../components/sideBar";
import { ButtonsOptionContainer, HomeContaienr, HomeContent, HomeMain, OptionButton } from "./styles";
import CardModel from "../../components/CardModel";



export default function Home() {

    const playlists = { name: "Guilherme Playlist", author: "Guilherme", lastUpdated: "2024-12-06T17:14:38Z" }


    const [seletecButton, setSeletecButton] = useState<string>("")
    return (
        <HomeContaienr>
            <SideBar />
            <HomeMain>
                <ButtonsOptionContainer>
                    <OptionButton
                        onClick={() => setSeletecButton("all")}
                    >Tudo</OptionButton>
                    <OptionButton
                        onClick={() => setSeletecButton("music")}
                    >Musica</OptionButton>
                    <OptionButton
                        onClick={() => setSeletecButton("artist")}
                    >Artista</OptionButton>
                </ButtonsOptionContainer>

                {seletecButton === "all" &&
                    <HomeContent>
                        <h2>
                            Novidades
                        </h2>
                        <CardModel type="playlist" data={playlists} />
                    </HomeContent>
                }
            </HomeMain>
        </HomeContaienr>
    )
} 