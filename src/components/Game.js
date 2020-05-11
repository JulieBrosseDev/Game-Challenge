import React from 'react';
import './Game.css'

 export default function Question(props) {
const direction = () => {
    const flexDirection = ["row", "rowreverse"];
    return flexDirection[Math.floor(Math.random() * 2)];
 }

    return (
        <div id="gameContainer">
            <h1>Guess The Right Answer</h1>
            <div id="counter">{props.counter}</div>
            <div id="question">{props.questionsArray[props.number]}</div>
            <div id="responsesContainer" class={direction()}>
            <button onClick={props.noValidation}>{props.fakeAnswersArray[props.number]}</button>
            <button onClick={props.answerValidation}>{props.trueAnswersArray[props.number]}</button>
            </div>
        </div>
    )
}
