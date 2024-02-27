import { ReactNode } from "react";
import styled from "styled-components";

const Button = styled.button`
  background: transparent;
  color: yellow;
  padding: 5px 10px;
  border: solid 2px yellow;
  border-radius: 2px;
`;

interface Props {
    children: ReactNode;
    onClick: () => void;
}

const CollectionButton = ({children, onClick}: Props) => {
  return (
      <Button onClick={onClick}> 
          {children}
    </Button>
  );
};

export default CollectionButton;
