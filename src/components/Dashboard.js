import React, { Component } from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'

const UNANSWERED_QUESTION_FILTER = 'unanswered'
const ANSWERED_QUESTION_FILTER = 'answered'


class Dashboard extends Component {
  
  constructor(props) {
    
    super(props)
        
    this.state = {
      questionFilter: UNANSWERED_QUESTION_FILTER,
      sortedAndFilteredQuestions: this.sortAndFilterQuestions(UNANSWERED_QUESTION_FILTER)
    }

  }
  
  sortAndFilterQuestions = (questionFilter) => {
    
    const { questions, userAnsweredQuestionIds } = this.props

    console.log('running sortAndFilterQuestions filter ', questionFilter)
    console.log('running sortAndFilterQuestions questions', questions)
    console.log('running sortAndFilterQuestions userAnsweredQuestionIds', userAnsweredQuestionIds)

    switch (questionFilter) {

      case UNANSWERED_QUESTION_FILTER :

        console.log('questionFilter', questionFilter)

        return (
          Object.keys(questions)
            .filter(key => !userAnsweredQuestionIds.includes(key))
            .sort((a,b) => questions[b].timestamp - questions[a].timestamp)  
            .map(id => questions[id])
        )
      
      case ANSWERED_QUESTION_FILTER :

        console.log('questionFilter', questionFilter)

        return (
          userAnsweredQuestionIds
            .sort((a,b) => questions[b].timestamp - questions[a].timestamp)  
            .map(id => questions[id])
        )
      
        
      default : 
          return questions

    }
   
  }
  
  handleRadioChange = (event) => {

    const newFilter = event.target.value
    const newQuestions = this.sortAndFilterQuestions(newFilter)

    console.log('setState: newQuestions', newQuestions)

    this.setState({
      questionFilter: newFilter,
      sortedAndFilteredQuestions: newQuestions
    })

  }

  render() {
    
    const { sortedAndFilteredQuestions } = this.state

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
        <ul className='question-list' >
          {
            sortedAndFilteredQuestions.map((question) => {
              return ( 
                <li key={question.id}>
                  <Link to={`/question/${question.id}`}>
                    Would you rather <strong>{question.optionOne.text}</strong> or <strong>{question.optionTwo.text}</strong>?
                  </Link>
                </li>
              )
            })
          }
        </ul>
      </div>
    )
  }
}

function mapStateToProps ({ questions, users, authedUser }) {
  
  console.log('DASHBOARD: calling mapStateToProps...')
  console.log('DASHBOARD: authUser Answers', JSON.stringify(Object.keys(users[authedUser.id].answers)) )
  console.log('DASHBOARD: Questions ', questions )
  console.log('DASHBOARD user questions: ', users[authedUser.id].questions)

  return {
    questions,
    userAnsweredQuestionIds: Object.keys(users[authedUser.id].answers) 
  }
}




export default connect(mapStateToProps)(Dashboard);