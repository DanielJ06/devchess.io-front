import styled from 'styled-components';

export const Container = styled.div`
  background-color: #272522;
  display: flex;
  flex-wrap: wrap;
  align-content: flex-start;

  margin-left: 25px;
  padding: 15px;

  width: 350px;
  border-radius: 15px;
`;

export const Label = styled.span`
  background-color: ${props => props.playerColor === 'w' ? '#EEEED2' : '#201E1C' };
  color: ${props => props.playerColor === 'w' ? '#201E1C' : '#EEEED2' };
  width: fit-content;
  height: fit-content;
  padding: 3px 12px;
  border-radius: 5px;
  margin: 3px;
`;