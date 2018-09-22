import React, { Component } from 'react'
import {connect} from 'react-redux';
import QuestionPage from './QuestionPage';

class Dashboard extends Component {
  
  constructor(props) {
    super(props)
    let { sortedQuestions, authedUser } = props
    this.state = {
      questionFilter: 'unanswered',
      visibleQuestions: sortedQuestions
        .filter( question => { 
          return(
            !(question.optionOne.votes.includes(authedUser)) &&
            !(question.optionTwo.votes.includes(authedUser))
          )
        }) 
    }
    this.handleRadioChange = this.handleRadioChange.bind(this)
  }

  handleRadioChange (event) {

    event.preventDefault()

    let { sortedQuestions, authedUser } = this.props
    let newQuestions = sortedQuestions
    let eventValue = event.target.value

    if ( eventValue === 'unanswered') {
      console.log('unanswered questions displayed...')
      newQuestions = newQuestions.filter( question => { 
        return(
          !(question.optionOne.votes.includes(authedUser)) &&
          !(question.optionTwo.votes.includes(authedUser))
        )
      })
    } else if (eventValue === 'answered') {
      newQuestions = newQuestions.filter( question => {
        return(
          (question.optionOne.votes.includes(authedUser)) ||
          (question.optionTwo.votes.includes(authedUser))
        )
      })
    }

    this.setState({
      questionFilter: event.target.value,
      visibleQuestions: newQuestions
    })

  }

  render() {
  
    return (
      <div>
        <h3>Recent Polls</h3>
        <div>
          <input 
            type="radio"
            value="unanswered" 
            name="visible-polls"
            onChange={this.handleRadioChange} 
            checked={this.state.questionFilter === 'unanswered'} />
            Unsanswered
          <input 
            type="radio"
            value="answered"
            onChange={this.handleRadioChange}
            name="visible-polls"
            checked={this.state.questionFilter === 'answered'}/> 
            Answered
        </div>
        <ul className='question-list' >
          {
            this.state.visibleQuestions.map((question) => {
              return ( 
                <li key={question.id}>
                  {question.id}: <a href="#">{question.optionOne.text} <strong>OR</strong> {question.optionTwo.text}?</a>
                  <QuestionPage id={question.id} />
                </li>
              )
            })
          }
        </ul>
      </div>
    )
  }
}

function mapStateToProps ({ questions, authedUser }) {
  
  const sortedQuestions = {}

  return {
      authedUser: authedUser.id,
      sortedQuestions: Object.keys(questions)
        .sort()
        .map( key => sortedQuestions[key] = questions[key])
  }
}

export default connect(mapStateToProps)(Dashboard);