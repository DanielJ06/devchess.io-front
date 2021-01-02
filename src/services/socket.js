import io from 'socket.io-client'

const URL = 'http://localhost:3333'; 

const socket = io(URL)

let mySocketId;
// register preliminary event listeners here:

export {
  socket,
  mySocketId
}