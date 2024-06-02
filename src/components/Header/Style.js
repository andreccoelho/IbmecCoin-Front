import styled from "styled-components";

const NavBarContainer = styled.div`
    display: flex;
    justify-content: space-around;
    background-color: #ffffff;
    padding: 10px;
    position: fixed;
    bottom: 0;
    width: 100%;
`;

const Tab = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  cursor: pointer;
  padding: 10px;
  transition: color 0.3s ease;

  ${({ isActive }) =>
    isActive &&
    `
    color: #9b51e0;
    &:after {
      content: '';
      display: block;
      width: 40px;
      height: 4px;
      background: #9b51e0;
      margin-top: 10px;
      border-radius: 2px;
    }
  `}

  &:hover {
    color: #9b51e0;
  }
`;

const Icon = styled.div`
  font-size: 24px;
`;

export { NavBarContainer, Tab, Icon };