import React, { useEffect, useState } from 'react';
import Chessboard from 'chessboardjsx';
import Chess from "chess.js";
import Records from '../../components/Records';

// import { Container } from './styles';

function Board() {
  const [game, setGame] = useState(null);
  const [history, setHistory] = useState([]);
  const [pieceSquare, setPieceSquare] = useState("");
  const [squareStyles, setSquareStyles] = useState({});
  const [isDraggable, setDraggable] = useState(true);
  const [turn, setTurn] = useState('');
  const [fen, setFen] = useState('start')

  useEffect(() => {
    function startGame() {
      const chessgame = new Chess();
      setGame(chessgame);
    }
    startGame();
  }, []);

  const onDrop = ({ sourceSquare, targetSquare }) => {
    let move = game.move({
      from: sourceSquare,
      to: targetSquare,
      promotion: 'q'
    });

    const checkmate = game.in_checkmate();
    const turn = game.turn();

    setTurn(turn);

    // if (turn === 'b') {
    //   setDraggable(false);
    // } else {
    //   setDraggable(true);
    // }

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
    <div>
      <Chessboard 
        id="chess"
        width={500}
        position={fen}
        draggable={isDraggable}
        onDrop={onDrop}
        onMouseOverSquare={onMouseOverSquare}
        onMouseOutSquare={onMouseOutSquare}
        squareStyles={squareStyles}
      />
    </div>
  );
}

export default Board;