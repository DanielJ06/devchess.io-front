import React from 'react';

import { Container, Label } from './styles';

const Records = ({ records }) => {
  return (
    <Container>
      {records.map(record => (
        <Label playerColor={record.color} >{record.san}</Label>
      ))}
    </Container>
  );
}

export default Records;