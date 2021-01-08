import React, { useEffect, useState } from 'react';
import Chessboard from 'chessboardjsx';
import Chess from "chess.js";
import { useParams } from 'react-router-dom';
import Records from '../../components/Records';
import { Container } from './styles';
const socket  = require('../../services/socket').socket;

function Board() {
  const [game, setGame] = useState(null);
  const [history, setHistory] = useState([]);
  const [pieceSquare, setPieceSquare] = useState("");
  const [squareStyles, setSquareStyles] = useState({});
  const [isDraggable, setDraggable] = useState(true);
  const [turn, setTurn] = useState('');
  const [fen, setFen] = useState('start')

  const { gameId } = useParams();

  useEffect(() => {
    function startGame() {
      const chessgame = new Chess();
      setGame(chessgame);
    }
    startGame();
  }, []);

  useEffect(() => {
    socket.on('move', data => {
      if (game) {
        onDrop({sourceSquare:data.ss, targetSquare:data.ts});
      }
    })
  }, [game])

  const onDrop = ({ sourceSquare, targetSquare }) => {
    if (game) {
      let move = game.move({
        from: sourceSquare,
        to: targetSquare,
        promotion: 'q'
      });
  
      const checkmate = game.in_checkmate();
      const turn = game.turn();
  
      
  
      if (checkmate) {
        if (turn === 'b') {
          alert('White wins')
        } else {
          alert('Black wins')
        }
      }
  
      if (move === null) return;
  
      setFen(game.fen);
      setHistory(game.history({verbose: true}));
      setSquareStyles(squareStyling(history, pieceSquare))
      setDraggable(isDraggable === false ? true : false);
      socket.emit('playerMove', {ss: sourceSquare, ts: targetSquare, gameId: gameId });
      console.log(isDraggable);
    }
  }

  const squareStyling = (pieceSquare, history) => {
    const sourceSquare = history.length && history[history.length - 1].from;
    const targetSquare = history.length && history[history.length - 1].to;
  
    return {
      [pieceSquare]: { backgroundColor: "rgba(255, 255, 0, 0.4)" },
      ...(history.length && {
        [sourceSquare]: {
          backgroundColor: "rgba(255, 255, 0, 0.4)"
        }
      }),
      ...(history.length && {
        [targetSquare]: {
          backgroundColor: "rgba(255, 255, 0, 0.8)"
        }
      })
    };
  };

  const highlightSquare = (sourceSquare, squaresToHighlight) => {
    const highlightStyles = [sourceSquare, ...squaresToHighlight].reduce(
      (a, c) => {
        return {
          ...a,
          ...{
            [c]: {
              background:
                "radial-gradient(circle, #fffc00 36%, transparent 40%)",
              borderRadius: "50%"
            }
          },
          ...squareStyling(
            history,
            pieceSquare
          )
        };
      },
      {}
    );

    setSquareStyles({...squareStyles, ...highlightStyles})
  }

  const removeHighlight = () => {
    setSquareStyles(squareStyling(pieceSquare, history ))
  }

  const onMouseOutSquare = square => removeHighlight(square);

  const onMouseOverSquare = (square) => {
    let possibleMoves = game.moves({
      square: square,
      verbose: true
    });

    if (possibleMoves.length === 0) return;

    let squaresToHighlight = [];
    for (var i = 0; i < possibleMoves.length; i++) {
      squaresToHighlight.push(possibleMoves[i].to);
    }

    highlightSquare(square, squaresToHighlight)
  }

  return (
    <Container>
      <Chessboard 
        id="chess"
        width={500}
        position={fen}
        draggable={true}
        onDrop={onDrop}
        onMouseOverSquare={onMouseOverSquare}
        onMouseOutSquare={onMouseOutSquare}
        squareStyles={squareStyles}
        boardStyle={{
          borderRadius: '10px'
        }}
        lightSquareStyle={{
          backgroundColor: '#EEEED2'
        }}
        darkSquareStyle={{
          backgroundColor: '#769656'
        }}
      />

      <Records records={history} />
    </Container>
  );
}

export default Board;