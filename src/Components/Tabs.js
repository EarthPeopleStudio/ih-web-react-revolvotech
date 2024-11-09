import styled from "styled-components";
export const Tabs = styled.div`
  background: #13161d;
  overflow: hidden;
  font-family: Open Sans;
  height: 3em;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const Tab = styled.button`
  border: none;
  outline: none;
  cursor: pointer;
  backdrop-filter: blur(20px);
  width: 20%;
  position: relative;
  color: white;
  margin-right: 0.1em;
  font-size: 1em;
  border: ${(props) => (props.active ? "1px solid #fff" : "1px solid #fff")};
  border-bottom: ${(props) => (props.active ? "" : "")};
  background-color: ${(props) => (props.active ? "#3e3d56" : "#13161d")};
  height: ${(props) => (props.active ? "2.6em" : "2.6em;")};
  transition: background-color 0.5s ease-in-out;

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: inherit;
    border-radius: 20px;
    filter: blur(10px);
    z-index: -1;
  }

  &:hover {
    transform: scale(1.025);
  }

  &::before:hover {
    border-radius: 20px;
  }
`;
export const Content = styled.div`
height: 100vh;
  ${(props) => (props.active ? "" : "display:none")}
`;
