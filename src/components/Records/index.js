import React from 'react';

// import { Container } from './styles';

const Records = ({ records }) => {
  return (
    <div>
      {records.map(record => (
        <span>{record.san}</span>
      ))}
    </div>
  );
}

export default Records;