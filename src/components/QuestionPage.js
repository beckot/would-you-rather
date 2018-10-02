import React, { Component } from 'react'
import {connect} from 'react-redux'
import { handleSaveQuestionAnswer } from '../actions/questions';

class QuestionPage extends Component {

    handleRadioChange = (event) => {

        const { dispatch, authedUser, question } = this.props
        
        let info = {
            authedUser: authedUser.id, 
            qid: question.id,
            answer: event.currentTarget.value
        }

        dispatch(handleSaveQuestionAnswer(info))

    }

    renderHelper() {
        
        const { question, author, userVote, notFound } = this.props
        
        if (notFound === true ) {
            return (
                <div>Error: no question with ID <strong>{this.props.match.params.id}</strong></div>
            )
        }
        else if ( userVote === null ) {

            return(
                
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
                            disabled={ userVote !== null }
                            checked={ userVote === 'optionOne' }
                            onChange={this.handleRadioChange} />
                
                        <label htmlFor='optionTwo'>{question.optionTwo.text}</label>
                        <input
                            id='optionTwo'
                            name="answer"
                            type="radio"
                            value="optionTwo"
                            disabled={ userVote !== null }
                            checked={ userVote === 'optionTwo' }
                            onChange={this.handleRadioChange} />
                
                    </form>
                </div>
            )

        }

        else {

            
            
            const optionOneVoteCount = question.optionOne.votes.length
            const optionTwoVoteCount = question.optionTwo.votes.length
            const voteCount = optionOneVoteCount + optionTwoVoteCount

            return (
                <div className='center'>
                    <h3>Would You Rather</h3>
                    <img className="avatar" src={author.avatarURL} alt={author.name} ></img>
                    
                    <div className={ userVote === 'optionOne' ? 'option selected' : 'option'} >
                        <h4>{question.optionOne.text}</h4>
                        <ul>
                            <li>Votes (#): {optionOneVoteCount}</li>
                            <li>Votes (% of all): { ((optionOneVoteCount/voteCount) * 100).toFixed(2) }%</li>
                        </ul>
                    </div>
                    <div className={ userVote === 'optionTwo' ? 'option selected' : 'option'} >
                        <h4>{question.optionTwo.text}</h4>
                        <ul>
                            <li>Votes (#): {optionTwoVoteCount}</li>
                            <li>Votes (% of all): { ((optionTwoVoteCount/voteCount) * 100).toFixed(2) }%</li>
                        </ul>
                    </div>
                </div>
            )

        }
    }

    render() {            
        
        return (                

            this.renderHelper()
            
        )
    }

    

}

function mapStateToProps({ authedUser, users, questions }, props) {

    const { id } = props.match.params

    console.log(questions[id])

    if (questions[id]) { 

        const question = questions[id];
        const author = users[question.author];
        const userVote = getUserVote(authedUser.id, question);

        return {
            authedUser,
            question,
            author,
            userVote,
            notFound: false   
        }

    }

    else {
        return {
            notFound: true
        }
    }

}

function getUserVote (user, question) {

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

export default connect(mapStateToProps)(QuestionPage)
