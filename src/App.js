import {Component, Fragment} from 'react';
import React from 'react';
import Question from './components/Question';
import axios from 'axios';
import './App.css'

class App extends Component {
  state = {
    data: {},
    isLoading: true,
//    dateCut: '', 
    dataKeys: [],
    dataValues: [],
    questionsArray: [],
    fakeAnswersArray: [],
    trueAnswersArray: [],
    number: 0,
    counter: 0,
    totalClicks: 0,
}

// displayFakeAnswers = () => {
//   const display = this.state.fakeAnswersArray.map(answer => {
//     return answer <br/>
//   })
// }

setNumber = () => {
  return this.state.number + 1
}

answerValidation = () => {
  const newCounter = this.state.counter + 1
  this.setState({
    counter: newCounter,
    number: this.setNumber(),
    totalClicks: newCounter,
  })
}


  async componentDidMount(){
      //insert the current date in the url so we only display 
    const {data} = await axios(`https://opentdb.com/api.php?amount=10`)
// go through all results (return objects)   
      const results = data.results
      console.log("RESULTS : " + results)
        // for each result go through all keys (return an array of keys)
      const keys = results.map((result, i) => {
        return Object.keys(result)
      })

      console.log(keys)
        // for each result go through all values (return an array of results)

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

        console.log("KAAAAAK"  + fakeAnswers)
        


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

  //          categories: 
  //          dateCut: data[data.length-1].data_inici.substr(0,10).split('-').join(',')
      
          })

          console.log(this.state.fakeAnswersArray[2])
          // const datasArray = data.results.map((result, i) => {
          //   return ({...result})
          // })

        }



    



  render(){
    return (
      <div className="">
          {this.state.totalClicks < 10
          ? 
          <Fragment>
            <div>COUNTER : {this.state.counter}</div>
            <h1>{this.state.questionsArray[this.state.number]}</h1>
            {this.state.fakeAnswersArray[this.state.number]
            }
            <div onClick={this.answerValidation}>{this.state.trueAnswersArray[this.state.number]}</div>
          </Fragment>
          : <p>GAME ENDED YOu have {this.state.counter} points</p>
          }
      </div>
    );
  }
}
export default App;
