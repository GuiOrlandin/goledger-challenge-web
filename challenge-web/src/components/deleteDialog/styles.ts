
import * as Dialog from "@radix-ui/react-dialog";
import styled from "styled-components";

export const DeleteButton = styled.button`
  background: none;
  border: none;
  padding: 0.1rem 0.4rem 0.2rem 0.4rem;

  &:focus {
    outline: none;
  }
`;

export const Overlay = styled(Dialog.Overlay)`
  position: fixed;
  width: 100vw;
  height: 100vh;
  inset: 0;
  background: rgba(0, 0, 0, 0.75);
`;

export const DialogDeleteCommentContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

export const Content = styled(Dialog.Content)`
  flex-direction: column;
  min-width: 16rem;
  text-align: center;
  border-radius: 6px;
  padding: 1rem ;
  background: #3F3A3E;

  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

export const CancelButton = styled(Dialog.Close)`
  display: flex;
  border: none;
  padding: 0.5rem;
  border-radius: 8px;
  color: white;
  font-weight: 500;
  background: #1D171C;

  &:hover {
    background: #b9b1d6;
  }
`;
export const ButtonsOfDialogContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;

export const DialogTitle = styled(Dialog.Title)`
  font-size: 1.2rem;
  margin-bottom: 1rem;
  margin-top: -0.1rem;
`;
export const DialogTrigger = styled(Dialog.Trigger)`
  display: flex;
`;

export const DialogDeleteTriggerButton = styled.button`
  border: none;
  font-size: 0.7rem;
  font-weight: 700;
  background: none;
`;

export const ConfirmButton = styled.button`
  display: flex;
  border: none;
  padding: 0.5rem;
  border-radius: 8px;
  color: white;
  font-weight: 500;
  background: #cb4444;

  &:hover {
    background: #cf6161;
  }
`;
