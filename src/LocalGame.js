import { useCallback, useMemo, useState } from "react";
import logic from './game.js';
import React from 'react';
import './App.css';

const LocalGame = ({options}) => {
  const board = useMemo(() => new logic(options), [options]);
  const [game, setGame] = useState({
    game: board.game,
    players: board.players,
    turn: board.turn
  })

  const add = useCallback((event)=>{
    var pos = JSON.parse(event.target.id);
    board.add(pos);
    setGame({
      game: board.game,
      players: board.players,
      turn: board.turn
    });
  },[board]);

  const draw = () => {
      return (
        <>
          {game.game.map((x, i) => {
            return (
              <tr key={i}>
                {x.map((y, j) => {
                  return (
                    <td id={`[${i},${j}]`} key={j} onClick={add.bind(this)} className={`p-5 border-4 border-${game.players[game.turn]}-600 text-${game.game[i][j].player}-600`}>{y.mass}</td>
                  )
                })}
              </tr>
            )
          })}
        </>
      );
  }
  

  return (
    <>
    {game.players.length>1?
      <div className="flex  bg-gradient-to-r from-purple-800 via-green-800 to-red-800">
        <table className={`m-auto border-collapse border-4 border-${game.players[game.turn]}-600 text-gray-300 font-extrabold text-2xl`}>
          <thead>
            <tr>
              <th className="text-center p-1" colSpan={6}>
                Chain Reaction
              </th>
            </tr>
          </thead>
          <tbody>{draw()}</tbody>
          <tfoot></tfoot>
        </table>
      </div>

    :
      <div className={`border-${game.players[0]}-600 border-4 rounded-sm w-screen md:w-auto h-full md:h-auto flex flex-col justify-center p-8 bg-gradient-to-br from-[#1e5799] via-[#043266] bg-opacity-50`}>
        <h1 className={`text-5xl p-8 font-bold flex justify-center text-${game.players[0]}-600`}>GAME OVER</h1>
        <h1 className={`col-span-4 text-lg text-${game.players[0]}-600`}>{game.players[0].toUpperCase()} WON</h1>
        <button onClick={() => {window.location.reload()}} className={`bg-${game.players[0]}-600 bg-opacity-70 hover:bg-opacity-100 mt-16 py-2 rounded-sm`}>Return to Main Menu</button>
      </div>  
    }
    </>
  );
}

export default LocalGame;