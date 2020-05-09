import {Component, Fragment} from 'react';
import React from 'react';
import Question from './components/Question';
import axios from 'axios';
import './App.css'

class App extends Component {
  state = {
    data: {},
    isLoading: true,
    dataKeys: [],
    dataValues: [],
    questionsArray: [],
    fakeAnswersArray: [],
    trueAnswersArray: [],
    number: 0,
    counter: 0,
    totalClicks: 0,
}


setNumber = () => {
  return this.state.number + 1
}

direction = () => {
   const flexDirection = ["row", "rowreverse"];
   return flexDirection[Math.floor(Math.random() * 2)];
}


answerValidation = () => {
  const newCounter = this.state.counter + 1
  const newClick = this.state.totalClicks + 1
  this.setState({
    counter: newCounter,
    number: this.setNumber(),
    totalClicks: newClick,
  })
  }


noValidation = () => {
  const newCounter = this.state.counter + 1
  const newClick = this.state.totalClicks + 1
  this.setState({
    number: this.setNumber(),
    totalClicks: newClick,

})
}

gameRestart = () => {
  this.setState({
      data: {},
      isLoading: true,
      dataKeys: [],
      dataValues: [],
      questionsArray: [],
      fakeAnswersArray: [],
      trueAnswersArray: [],
      number: 0,
      counter: 0,
      totalClicks: 0
  })
}


  async componentDidMount(){
      //insert the current date in the url so we only display 
    const {data} = await axios(`https://opentdb.com/api.php?amount=10&type=boolean`)
// go through all results (return objects)   
      const results = data.results
      console.log("RESULTS : " + results)
      const keys = results.map((result, i) => {
        return Object.keys(result)
      })

      console.log(keys)

        const values = results.map((result, i) => {
          return Object.values(result)
        })
      
        const questions = results.map((result) => {
          return `${Object.values(result)[3]}`
        })

        const fakeAnswers = results.map((result) => {
          return `${Object.values(result)[5]}`
        })

        const fakeAnswersArrays  = fakeAnswers.map(answer => {
          return answer.split(',')
        })        

        const trueAnswers = results.map((result) => {
          return `${Object.values(result)[4]}`
        })



          this.setState({
            data, 
            isLoading: false,
            dataKeys: keys,
            dataValues: values,
            questionsArray: questions,
            fakeAnswersArray: fakeAnswersArrays,
            trueAnswersArray: trueAnswers
          })
        }



  render(){
    return (
      <div>
          {this.state.totalClicks < 10
          ? 
          <div id="gameContainer">
            <div id="counter">{this.state.counter}</div>
            <div id="question">{this.state.questionsArray[this.state.number]}</div>
            <div id="responsesContainer" class={this.direction()}>
              <div onClick={this.noValidation}>{this.state.fakeAnswersArray[this.state.number]}</div>
              <div onClick={this.answerValidation}>{this.state.trueAnswersArray[this.state.number]}</div>
            </div>
          </div>
          :   <div>
    <p>GAME ENDED YOU have points</p>
    <button>RESTART</button>
  </div>
          }
      </div>
    );
  }
}
export default App;
