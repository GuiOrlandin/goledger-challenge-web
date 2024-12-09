
import styled from "styled-components";


export const SideBarContainer = styled.aside`
    display: flex;
    flex-direction: column;
    align-items: start;
    background: #1D171C;
    min-width: 14rem;
    padding: 2rem;
    max-height: 100vh;
`
export const CreatePlaylistButton = styled.button`
    display: flex;
    border: 1px solid gray;
    background: none;
    font-size: 0.8rem;
    padding: 0.5rem;
    gap: 0.3rem;
    align-items: center;
    justify-content: center;
`


export const SideBarTitleAndCreatePlaylist = styled.div`
    display: flex;
    width: 100%;
    margin-bottom: 1rem;
    justify-content: space-between;
    align-items: center;
`
export const SideBarTitle = styled.h2`
    margin:0;
`


export const PlaylistContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: start;
    padding: 0.5rem;
    border-radius: 4px;
    min-width: 13rem;

    &:hover {
        background: #594F58;
        cursor: pointer;
    }
`
export const ListOfPlaylistContainer = styled.section`
    display: flex;
    flex-direction: column;
    align-items: start;
    gap: 1rem;
    margin-bottom: -3rem;
    margin-top: 1rem;

    h3 {
        font-size:  1rem;
        font-weight: 400;
        margin: 0;
        padding: 0;
    }
    h2 {
        font-size: 1rem;
        margin: 0;
        padding: 0;
    }
    p {
        font-size: 1rem;
        margin: 0;
        padding: 0;
    }

`

export const ListOfRecentSongsContainer = styled.section`
    display: flex;
    width: 100%;
    flex-direction: column;
    margin-top: 4rem;    
    `

export const RecentSongsContainer = styled.div`
    display: flex;
    margin-top: 1rem;
    align-items: center;
    justify-content: space-between;

    
    h2 {
        font-size: 1rem;
        margin: 0;
        padding: 0;
    }
    p {
        font-size: 1rem;
        margin: 0;
        padding: 0;
    }
    
    `
export const RecentSongsNameAndAlbumContainer = styled.div`
        display: flex;
        flex-direction: column;
        max-width: 10rem;
    h2 {
        font-size: 1rem;

    }

     p {
        font-size: 0.8rem;
     }
        `
export const SongAndTimeContainer = styled.div`
    display: flex;
    align-items: center;
    gap: 0.3rem;
`