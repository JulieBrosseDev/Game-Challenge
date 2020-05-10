import {Component, Fragment} from 'react';
import React from 'react';
import Game from './components/Game';
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

reStart = () => {
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
  this.componentDidMount()
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
            dataKeys: keys,
            dataValues: values,
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
          
          :   <div id="endGamePage">
                <h1>GAME ENDED</h1> 
                <h2>YOU have</h2> 
                <p>{this.state.counter} points</p>
                <button onClick={this.reStart}>RESTART</button>
              </div>
          }
      </Fragment>
    );
  }
}
export default App;
