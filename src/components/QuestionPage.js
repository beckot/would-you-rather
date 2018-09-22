import React, { Component } from 'react'
import {connect} from 'react-redux'
import { handleSaveQuestionAnswer } from '../actions/questions';

class QuestionPage extends Component {

    constructor(props) {
        super(props)
        const { authedUser, question } = props
        this.state = {
          userVote: this.getUserVote(authedUser.id, question),
        }
        console.log('constructing with state', this.state)
    }

    getUserVote (user, question) {

        if (question.optionOne.votes.includes(user)) {
            return 'optionOne'
        }

        else if (question.optionTwo.votes.includes(user)) {
            return 'optionTwo'
        }

        else {
            return null
        }
    
    }

    toggleAnswer = (event) => {

        event.preventDefault()

        const { dispatch, authedUser, question } = this.props
        
        let info = {
            authedUser: authedUser.id, 
            qid: question.id,
            answer: event.currentTarget.value
        }

        console.log(info)
        
        dispatch(handleSaveQuestionAnswer(info))

    }

    render() {            
        
        const { question, author } = this.props
        const { userVote } = this.state

        return (                
        
        <div className='center'>
            <h3>Would You Rather</h3>
            <img className="avatar" src={author.avatarURL} alt={author.name} ></img>
            <form>
                <label htmlFor='optionOne'>{question.optionOne.text}</label>
                <input
                    id='optionOne'
                    name="answer"
                    type="radio"
                    value="optionOne"
                    checked={userVote === 'optionOne'}
                    onChange={this.toggleAnswer} />
         
                <label htmlFor='optionTwo'>{question.optionTwo.text}</label>
                <input
                    id='optionTwo'
                    name="answer"
                    type="radio"
                    value="optionTwo"
                    checked={userVote === 'optionTwo'}
                    onChange={this.toggleAnswer} />
         
            </form>
            
            
        </div>

        )
    }
}

function mapStateToProps({ authedUser, users, questions }, props) {

    const { id } = props.match.params
    const question = questions[id];
    const author = users[question.author]

    return {
        authedUser,
        question,
        author   
    }

}

export default connect(mapStateToProps)(QuestionPage)
