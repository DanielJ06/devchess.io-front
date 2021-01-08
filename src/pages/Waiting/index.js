import React, { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
const socket  = require('../../services/socket').socket;

const Waiting = () => {
  const [started, setStarted] = useState(null);
  const { gameId } = useParams();
  const history = useHistory();

  useEffect(() => {
    socket.on('start', () => {
      history.push(`/game/${gameId}`)
    });
    socket.on('status', data => console.log(data))
  }, [])

  return (
    <div>
      {started ? (
        <h1>{started}</h1>
      ) : (
        <h1>Send to a friend: {gameId}</h1>
      )}
    </div>
  );
}

export default Waiting;