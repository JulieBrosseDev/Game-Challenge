import React from 'react';
import './EndPage.css'

export default function EndPage(props) {
    return(
        <div id="endGamePage">
            <h1>GAME ENDED</h1> 
            <h2>YOU GOT</h2> 
            <p>{props.counter} points</p>
            <button onClick={props.reStart}>RESTART</button>
        </div>
    )
 }