import styled from "styled-components";


export const HomeContaienr = styled.div`
    display: flex;
    width: 100vw;
    height: 100vh;
    background: #262025;
    `
export const HomeMain = styled.main`
display: flex;
width: 100%;
flex-direction: column;
padding: 2rem 0 0 0;
`

export const ButtonsOptionContainer = styled.div`
    display: flex;
    gap: 1rem;
    margin-left: 1rem;
`
export const OptionButton = styled.div`
background: #594F58;
padding: 0.4rem;
border-radius: 3px;

&:hover {
    cursor: pointer;
    background: #413E41;
}
`
export const HomeContent = styled.div`
    margin-top: 1rem;
    width: 100%;
    height: 100%;
    background: #3F3A3E;
    padding-left: 1rem;


    h2 {
        font-size: 2rem;
    }
`
