import './App.css';
import LocalGame from './LocalGame.js';
import { useState } from 'react';
import React from 'react';



const App = () => {

  const [players,setPlayers] = useState(2);
  const [ready,setReady] = useState(false);


  return(
    
      <div className={`App text-white ${ready?'bg-black':''} h-screen grid place-items-center`}>
        {
          ready?
            <LocalGame options={{players:players}}/>
          :
            <div className="border-red-600 border-4 rounded-sm w-screen md:w-auto h-full md:h-auto flex flex-col justify-center p-8 bg-black bg-opacity-50">
              <h1 className="typing-animation">
                Welcome to Chain Reaction!
              </h1>

              <div className="grid grid-cols-10 gap-4">
                  
                <p className="text-2xl text-left col-span-10 sm:col-start-1 sm:col-span-3 text-green-600 font-bold">Players</p>
                <button onClick={()=>{setPlayers(2);}} className={`hover:bg-green-600 hover:bg-opacity-75 p-2 rounded-sm text-lg ${players===2?'bg-green-600 bg-opacity-50':''}`}>2</button>
                <button onClick={()=>{setPlayers(3);}} className={`hover:bg-blue-600 hover:bg-opacity-75 p-2 rounded-sm text-lg ${players===3?'bg-blue-600 bg-opacity-50':''}`}>3</button>
                <button onClick={()=>{setPlayers(4);}} className={`hover:bg-yellow-600 hover:bg-opacity-75 p-2 rounded-sm text-lg ${players===4?'bg-yellow-600 bg-opacity-50':''}`}>4</button>
                <button onClick={()=>{setPlayers(5);}} className={`hover:bg-pink-600 hover:bg-opacity-75 p-2 rounded-sm text-lg ${players===5?'bg-pink-600 bg-opacity-50':''}`}>5</button>
                <button onClick={()=>{setReady(true);}} className="bg-red-600 bg-opacity-75 col-start-4 col-end-8 p-2">Play</button>
              </div>
            </div>
        }
        {/* for purgecss to include css */}
        <div className="border-red-600 text-red-600 hidden"></div>
        <div className="border-green-600 text-green-600 hidden"></div>
        <div className="border-blue-600 text-blue-600 hidden"></div>
        <div className="border-yellow-600 text-yellow-600 hidden"></div>
        <div className="border-pink-600 text-pink-600 hidden"></div>
        <div className="border-indigo-600 text-indigo-600 hidden"></div>
        <div className="border-purple-600 text-purple-600 hidden"></div>
        <div className="border-gray-600 text-gray-600 hidden"></div>
      </div>
    
    );
}

export default App