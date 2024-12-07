import styled from "styled-components";

export const CardContainer = styled.div`
  border-radius: 8px;
  padding: 1rem;
  margin: 0.5rem 0;
  background-color: #1D171C;
  width: 15rem;

  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s ease, box-shadow 0.2s ease;

&:hover {
  transform: translateY(-5px);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
}
`;

export const Title = styled.h3`
  margin: 0;
  font-size: 1.2rem;
  display: -webkit-box;
  -webkit-line-clamp: 1; 
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 100%;
`;

export const InfoRow = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 8px 0;
`;

export const Label = styled.span`
  font-weight: bold;
`;

export const Value = styled.span`
  color: gray;
`;
