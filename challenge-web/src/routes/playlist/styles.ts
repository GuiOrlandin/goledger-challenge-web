import styled from "styled-components";


export const CreatePlaylistContainer = styled.form`
    display: flex;
    width: 100vw;
    flex-direction: column;
    padding: 2rem 2rem 0 2rem;
`


export const NameInput = styled.input`
    padding:1rem;
    font-size: 1.4rem;
    margin-top: 1rem;
    margin-bottom: 1.2rem;
    border-radius: 8px;
    background: #594F58;
    border: 2px solid gray;
`

export const LabelAndInputContainter = styled.div`
    display: flex;
    flex-direction: column;
    max-width: 30vw;

    label {
        font-size: 1.3rem;
        font-weight: bold;
    }
`

export const PlaylistContainer = styled.div`
    display: flex;
    height: 100vh;
    width: 100vw;
`
export const PlaylistContent = styled.main`
    display: flex;
    height: 100%;
    width: 100%;
     padding: 0 2rem 0 2rem;
    background: #3F3A3E;
    `
export const PlaylistTitle = styled.h1``
export const NameAndContent = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
`

export const Table = styled.table`
    width: 100%;
    border-collapse: collapse;
    margin-top: 1rem;

    th, td {
        text-align: left;
        padding: 0.5rem 1rem;
        color: #FFFFFF;
    }

    th {
        font-size: 1.5rem;
        font-weight: bold;
    }

    td {
        font-size: 0.9rem;
    }

    tbody tr:hover {
        background-color: #555555;
    }
`;

export const CreatePlaylistButton = styled.button`
    display: flex;
    justify-content: center;
    align-items: flex-start;
    position: fixed;
    bottom: 2%;
    left: 90%;
`


export const SearchInput = styled.input`
    margin-top: 1rem;
    padding: 0.5rem;
    font-size: 1rem;
    border: 1px solid #fff;
    border-radius: 5px;
    background-color: #555;
    color: #fff;

    &::placeholder {
        color: #ccc;
    }
`;



export const Card = styled.div`
    background-color: #444;
    padding: 0 2rem 0 1rem;
    margin-top: 1rem;
    border-radius: 8px;
    display: flex;
    position: absolute;
    flex-direction: row;
    z-index: 1000;
    align-items: center;
    justify-content: space-between;
    color: #fff;
    width: 96%;
    
    h3 {
        font-size: 1.2rem;
        font-weight: bold;
    }

    p {
        font-size: 1rem;
        margin: 0.5rem 0;
    }

    svg {
        font-size: 1.5rem;
        margin-top: 0.5rem;
    }
`;



export const SvgAddSongContainer = styled.div`
svg {
        &:hover {
            cursor: pointer;
        }
    }
`
export const AddMusicaCard = styled(Card)`
 
`;


export const SearchAndCardContainer = styled.div`
    display: flex;
    flex-direction: column;
    z-index: 1000;
    position: relative;

`

export const CardContainer = styled.div`
    display: flex;
    flex-direction: column;
`