import { ReactNode } from "react";
import styled from "styled-components";

const Div = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 400px;
  border: 2px solid transparent;
  border-radius: 2px;
  box-shadow: 0 0 2px 2px rgba(255, 255, 0, 0.75);
  margin-top: 50px;
`;

const LogoContainer = ({ children }: { children: ReactNode }) => {
  return (
    <div className="flex justify-center w-1/1">
      <Div>{children}</Div>
    </div>
  );
};

export default LogoContainer;
