import React, { Component } from 'react'
import {connect} from 'react-redux'
import QuestionList from './QuestionList';

const UNANSWERED_QUESTION_FILTER = 'unanswered'
const ANSWERED_QUESTION_FILTER = 'answered'


class Dashboard extends Component {
  
  state = {
      questionFilter: UNANSWERED_QUESTION_FILTER,
  } 
  
  handleRadioChange = (event) => {

    const newFilter = event.target.value

    this.setState({
      questionFilter: newFilter
    })

  }  

  render() {
    
    const { questions, userAnsweredQuestionIds } = this.props
    const { questionFilter } = this.state

    return (
      <div>
        <h3>Recent Questions</h3>
        <div>
          <input 
            type="radio"
            value="unanswered" 
            name="visible-polls"
            onChange={this.handleRadioChange} 
            checked={this.state.questionFilter === UNANSWERED_QUESTION_FILTER} />
            Unsanswered
          <input 
            type="radio"
            value="answered"
            onChange={this.handleRadioChange}
            name="visible-polls"
            checked={this.state.questionFilter === ANSWERED_QUESTION_FILTER}/> 
            Answered
        </div>
        <QuestionList 
          questions={questions} 
          userAnsweredQuestionIds={userAnsweredQuestionIds} 
          questionFilter={questionFilter} />  
      </div>
    )
  }
}

function mapStateToProps ({ questions, users, authedUser }) {
  
  return {
    questions,
    userAnsweredQuestionIds: Object.keys(users[authedUser.id].answers) 
  }
}

export default connect(mapStateToProps)(Dashboard);