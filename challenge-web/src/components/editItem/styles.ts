import * as Dialog from "@radix-ui/react-dialog";
import styled from "styled-components";

interface isSelected {
    $isActive: boolean
}

export const Overlay = styled(Dialog.Overlay)`
  position: fixed;
  width: 100vw;
  height: 100vh;
  inset: 0;
  background: rgba(0, 0, 0, 0.75);
`;

export const Title = styled(Dialog.Title)`
  padding: 0;
  margin: 0 0 0 0;
`;
export const DescriptionContainer = styled(Dialog.Description)`
  margin-bottom: 0;
  color:  #FFFEFE;
`;
export const Content = styled(Dialog.Content)`
  flex-direction: column;
  min-width: 16rem;
  border-radius: 6px;
  padding: 2rem 2rem 1.2rem 2rem;
  background: #3F3D45;
  color:#FFFEFE;
  min-width: 20rem;

  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

export const CloseAndSaveChangesButtonsContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 2.5rem;
`;
export const CloseButton = styled.button`
  color: white;
  padding: 1rem 3.5rem;
  border: none;
  border-radius: 8px;
  background: #85888c;

  &:hover {
    cursor: pointer;
    background: #e1e8f6;
  }
`;

export const SaveButton = styled(CloseButton)`
  background: linear-gradient(
    90deg,
    rgba(122, 74, 163, 1) 0%,
    rgba(146, 80, 210, 1) 100%
  );

  &:hover {
    background: #cdc3ea;
  }
`;

export const CreateButton = styled(SaveButton)``;

export const TriggerDialogButton = styled.button`
  background: none;
  border: none;

  &:hover {
    cursor: pointer;
  }
`;

export const FormOfCreateOrEditItem = styled.form`
  display: flex;
  flex-direction: column;

  label {
    margin-top: 1.4rem;
  }

  input {
    padding: 1rem;
    border-radius: 8px;
    border: 1px solid #e1e8f6;

    margin-top: 0.5rem;
  }

  select {
    border: 1px solid #e1e8f6;
    margin-top: 0.5rem;
    padding: 0.9rem;
    border-radius: 8px;
  }
`;

export const EditItemButton = styled.button`
  display: flex;
  padding: 0;
  border: none;
  color: white;
  outline: none;

  background: none;

  &:hover {
    border: none;
  outline: none;
    cursor: pointer;
  }
`;

export const LabelAndInputContainer = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
  margin-bottom: 0.5rem;
`

export const ErrorMessage = styled.p`
  display: flex;
  color: red;
  font-size: 0.8rem;
  margin-top: 6.5rem;
  position: absolute;
`;
