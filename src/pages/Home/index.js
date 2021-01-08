import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import shortid from 'shortid';
const socket  = require('../../services/socket').socket

const Home = () => {
  const [hostUsername, setHostUsername] = useState('');
  const [gameId, setGameId] = useState('');
  const [username, setUsername] = useState('');

  const history = useHistory();

  useEffect(() => {
    socket.on('status', data => console.log(data))
  }, [])

  const handleNavigateToMatchMaking = () => {
    const gameId = shortid.generate();
    console.log(gameId);
    socket.emit('createNewGame', {gameId:gameId, username: hostUsername});
    history.push(`/matchmaking/${gameId}`);
  }

  const handleJoin = () => {
    socket.emit('playerJoinGame', {
      gameId: gameId,
      username: username
    })
    history.push(`/bgame/${gameId}`);
  }

  return (
    <div>
      <div>
        <input 
          type="text" 
          value={hostUsername} 
          onChange={e => setHostUsername(e.target.value)} 
        />
        <button onClick={handleNavigateToMatchMaking} >
          Create a game
        </button>
      </div>
      <br/>
      <div>
        <h3>Join a game</h3>

        <label>Game Id</label>
        <input 
          value={gameId} 
          onChange={e => setGameId(e.target.value)} 
          type="text"
        />
        
        <label>username</label>
        <input 
          value={username}
          onChange={e => setUsername(e.target.value)}
          type="text"
        />

        <button onClick={handleJoin} >
          Join
        </button>
      </div>
    </div>
  )
}

export default Home;