import {Component, Fragment} from 'react';
import React from 'react';
import Game from './components/Game';
import EndPage from './components/EndPage';
import axios from 'axios';
import './App.css'

class App extends Component {
  state = {
    data: {},
    isLoading: true,
    questionsArray: [],
    fakeAnswersArray: [],
    trueAnswersArray: [],
    number: 0,
    counter: 0,
    totalClicks: 0,
}

//CHANGE THE QUESTION NUMBER TO GO TO THE NEXT ONE
setNumber = () => {
  return this.state.number + 1
}

// WHEN RIGHT ANSWER : INCREASE BOTH NUMBER OF CLICKS AND COUNTER AND CHANGE THE QUESTION NUMBER (TO GO TO THE NEXT ONE)
answerValidation = () => {
  const newCounter = this.state.counter + 1
  const newClick = this.state.totalClicks + 1
  this.setState({
    counter: newCounter,
    number: this.setNumber(),
    totalClicks: newClick,
  })
  }

// WHEN FALSE ANSWER : INCREASE NUMBER OF CLICKS AND CHANGE THE QUESTION NUMBER (TO GO TO THE NEXT ONE)
noValidation = () => {
  const newCounter = this.state.counter + 1
  const newClick = this.state.totalClicks + 1
  this.setState({
    number: this.setNumber(),
    totalClicks: newClick,

})
}

reStart = () => {
  this.setState({
      data: {},
      isLoading: true,
      questionsArray: [],
      fakeAnswersArray: [],
      trueAnswersArray: [],
      number: 0,
      counter: 0,
      totalClicks: 0
  })
  this.componentDidMount()
}


  async componentDidMount(){
    const {data} = await axios(`https://opentdb.com/api.php?amount=10&type=boolean`)  
    const results = data.results
      
    const questions = results.map((result) => {
      const str = `${Object.values(result)[3]}`
      return str.toString().replace(/[^a-zA-Z ]/g, "")
    })

    const fakeAnswers = results.map((result) => {
      const str =  `${Object.values(result)[5]}`
      return str.toString().replace(/[^a-zA-Z ]/g, "")
    })

    const fakeAnswersArrays  = fakeAnswers.map(answer => {
      const str = answer.split(',')
      return str.toString().replace(/[^a-zA-Z ]/g, "")
    })        

    const trueAnswers = results.map((result) => {
      const str  =`${Object.values(result)[4]}`
      return str.toString().replace(/[^a-zA-Z ]/g, "")
    })

    this.setState({
      data, 
      isLoading: false,
      questionsArray: questions,
      fakeAnswersArray: fakeAnswersArrays,
      trueAnswersArray: trueAnswers
    })
  }



  render(){
    return (
      <Fragment>
          {this.state.totalClicks < 10
          ? 
          <Game 
          counter={this.state.counter} 
          questionsArray={this.state.questionsArray} 
          number={this.state.number} 
          fakeAnswersArray={this.state.fakeAnswersArray} 
          trueAnswersArray={this.state.trueAnswersArray} 
          answerValidation={this.answerValidation}
          noValidation={this.noValidation}    
          />
          
          : <EndPage counter={this.state.counter} reStart={this.reStart}/>
        }
      </Fragment>
    );
  }
}
export default App;
