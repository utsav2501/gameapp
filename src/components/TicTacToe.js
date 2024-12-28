import React, { useState } from 'react'
import './tictac.css';
import Confetti from 'react-confetti'
import {
    useWindowSize,
    useWindowWidth,
    useWindowHeight,
  } from '@react-hook/window-size'
  

function TicTacToe() {
    const { width, height } = useWindowSize()
    const [fplayer, setFplayer] = useState('X');
    const [splayer, setSplayer] = useState('O');

    const [board, setBoard] = useState(Array(9),null);
    const [isXturn, setIsXturn] = useState(true);
    const [winner, setWinner] = useState(null);
    function square(index) {
        return <button className='cell' onClick={()=>handleClick(index)}>{board[index]}</button>
    }
    function checkWinner(board) {
        const combination = [
            [0,1,2],
            [3,4,5],
            [6,7,8],
            [0,4,8],
            [6,4,2],
            [0,3,6],
            [1,4,7],
            [2,5,8]
            
        ];
        for(let i = 0; i < combination.length; i++) {
            const [a,b,c] = combination[i];
            if(board[a] === board[b] && board[b] === board[c]) {
                console.log(board[a]);
                return setWinner(board[a]);
            }
        }

    }
    function handleClick(index) {
        
        if(checkWinner(board)) {
            return ;
        }
        const newBoard = [...board];
        if(newBoard[index]) {
            return ;
        }
        isXturn ? newBoard[index] = 'X' : newBoard[index] = 'O';
        setBoard(newBoard);
        
        setIsXturn(!isXturn);
        
        console.log(index, 'click');
        
    }
    function handleRestart() {
        setBoard([], null);
        setWinner(null);
        setIsXturn(true);
    }
    
  return (
    <>{winner ? <>
     <Confetti
      width={width}
      height={height}
    />
    <div className='congra'>
        <h1><span style={{color : "orange"}}>Congratulations!</span> {winner === 'X' ?` ${fplayer}`  : `${splayer}`}</h1>
        <button className='playagain' onClick={handleRestart}><span>Play Again</span></button>
    </div>
    </> :<>
    
    <div class="container">
    <h1>Tic Tac Toe</h1>
    <div className='playerName'>
        <div className='fplayer'>
        <label htmlFor="xplayer">Player X Name:</label>
        <input type="text" name='xPlayer'  onChange={(e)=>{setFplayer(e.target.value)}}/>
        </div>
        <div className='splayer'>
        <label htmlFor="oplayer">Player O Name:</label>
        <input type="text" name='oPlayer'  onChange={(e)=>{setSplayer(e.target.value)}}/>
        </div>
    </div>
    <div class="game-board" id="gameBoard">
        {square(0)}
        {square(1)}
        {square(2)}
        {square(3)}
        {square(4)}
        {square(5)}
        {square(6)}
        {square(7)}
        {square(8)}
        
    </div>
   
    <div className='winner'>{winner ? `${fplayer} is Winner` : <>{isXturn? `${fplayer}'s turn` : `${splayer}'s turn`}</>}</div>
    <button className="restartButton" onClick={handleRestart}>Restart</button>
</div>
</> 

}
</>
  )
}

export default TicTacToe
