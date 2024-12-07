
import styled from "styled-components";


export const SideBarContainer = styled.aside`
    display: flex;
    flex-direction: column;
    align-items: start;
    background: #1D171C;
    padding: 2rem;
    max-height: 100vh;
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
export const SearchInputContainer = styled.div`
    display: flex;
    flex-direction: column;
    margin-bottom: 2rem;
    position: relative;

    input {
        background: #594F58;
        border: none;
        border-radius: 4px;
        padding: 1rem;
        margin-top: 2rem;
    }

    svg {
    position: absolute;
    margin-top: 1rem;
    margin-left: 11rem;
    }
   
`

export const PlaylistContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: start;
    padding: 0.5rem;
    border-radius: 4px;
    width: 100%;

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
    margin-top: 1rem;

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
        `
export const SongAndTimeContainer = styled.div`
    display: flex;
    align-items: center;
    gap: 0.3rem;
`