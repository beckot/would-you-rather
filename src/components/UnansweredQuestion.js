import React, { Component } from 'react';
import { handleSaveQuestionAnswer } from '../actions/questions';
import { connect } from 'react-redux'  

class UnansweredQuestion extends Component {

    saveQuestionAnswer = (event) => {

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
        
        const { question } = this.props

        return (                
        
        <div className='center'>
            <h3>Would You Rather</h3>
            <img className="avatar" src={question.author.avatarURL} alt={question.author.name} ></img>
            <form>
                <label htmlFor='optionOne'>{question.optionOne.text}</label>
                <input
                    id='optionOne'
                    name="answer"
                    type="radio"
                    value="optionOne"
                    onChange={this.saveQuestionAnswer} />
         
                <label htmlFor='optionTwo'>{question.optionTwo.text}</label>
                <input
                    id='optionTwo'
                    name="answer"
                    type="radio"
                    value="optionTwo"
                    onChange={this.saveQuestionAnswer} />
         
            </form>
            
            
        </div>

        )
    }

}

function mapStateToProps ({ authedUser }, { question } ) {
    return {
        authedUser,
        question
    }

}

export default connect(mapStateToProps)(UnansweredQuestion)


