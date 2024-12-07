import styled from "styled-components";


interface IsSelected {
    $isActive: boolean;
}

export const HomeContaienr = styled.div`
  display: flex;
  min-height: 100vh; 
  background: #262025;
`;
export const HomeMain = styled.main`
display: flex;
flex-direction: column;
flex-grow: 1; 
padding: 2rem 0 0 0;
`;

export const ButtonsOptionContainer = styled.div`
    display: flex;
    gap: 1rem;
    margin-left: 1rem;
`
export const OptionButton = styled.div<IsSelected>`
background: ${({ $isActive }) => ($isActive ? "#413E41" : "#594F58")}; 
padding: 0.5rem;
border-radius: 3px;

&:hover {
    cursor: pointer;
    background: #413E41;
}
`
export const HomeContent = styled.section`
    margin-top: 1rem;
    width: 100%;
    height: 100%;
    background: #3F3A3E;
    padding-left: 1rem;
    position: relative;
    
    
    h2 {
        font-size: 2rem;
    }
    `

export const CardListContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 1rem; 
`;
export const PaginationContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.2rem;
  position: absolute; 
  bottom: 1rem; 
  left: 50%; 
  transform: translateX(-50%); 
  padding: 1rem;
  width: calc(100% - 2rem); 
`;