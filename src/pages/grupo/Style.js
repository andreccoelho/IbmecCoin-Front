import styled from "styled-components";
import {motion} from "framer-motion";

export const ConvitesContainer = styled(motion.div)`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 1em;
  background-color: #fff;
  font-family: 'Krub', sans-serif;
  color: #333;
`;
export const Header = styled(motion.div)`
  background-color: var(--primaria);
  color: white;
  padding: 1em;
  border-radius: 10px;
  text-align: center;
  margin-bottom: 1em;
`;
export const Section = styled(motion.div)`
  background-color: #f7f7f7;
  padding: 1em;
  border-radius: 10px;
  margin-bottom: 1em;
`;
export const CardContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1em;
`;
export const Card = styled(motion.div)`
  background-color: white;
  padding: 1em;
  border-radius: 10px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;
export const CardItem = styled.div`
  margin: 0.5em 0;
  font-size: 1em;
`;
export const CardButton = styled(motion.button)`
  padding: 0.8em 1em;
  border-radius: 5px;
  background-color: var(--primaria);
  color: white;
  font-size: 1em;
  border: none;
  cursor: pointer;
  transition: background 0.3s ease;
  margin-top: 1em;

  &:hover {
    background-color: #3700b3;
  }
`;
export const Message = styled(motion.p)`
  color: ${props => (props.type === 'error' ? 'red' : 'green')};
  margin: 0.5em 0;
`;