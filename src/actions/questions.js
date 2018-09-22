import { saveQuestionAnswer } from '../utils/api';
import { saveQuestion } from '../utils/api';
import { showLoading, hideLoading } from 'react-redux-loading-bar';

export const RECEIVE_QUESTIONS = 'RECEIVE_QUESTIONS'
export const TOGGLE_QUESTION_ANSWER = 'TOGGLE_QUESTION_ANSWER'
export const ADD_QUESTION = 'ADD_QUESTION'

export function receiveQuestions(questions) {
    return {
        type: RECEIVE_QUESTIONS,
        questions
    }
}

function toggleQuestionAnswer({ authedUser, qid, answer }) {
    
    return {
        type: TOGGLE_QUESTION_ANSWER,
        authedUser,
        qid,
        answer
    }

}

export function handleSaveQuestionAnswer (info) {
    return (dispatch) => {
        dispatch(toggleQuestionAnswer(info))
        return saveQuestionAnswer(info)
            .catch((err) => {
                console.warn(err)
                dispatch(toggleQuestionAnswer(info))
                alert('Could not save the answer, try again!')
            })
    }
}

function addQuestion(question) {

    return {
        type: ADD_QUESTION,
        question
    }

}

export function handleAddQuestion(optionOneText, optionTwoText) {
    
    return (dispatch, getState) => {
        
        const { authedUser } = getState()
        
        dispatch(showLoading())

        return saveQuestion({
            optionOneText,
            optionTwoText,
            author: authedUser.id
        })
            .then((question) => dispatch(addQuestion(question)))
            .then(() => dispatch(hideLoading()))
            .catch(err => console.log(err))
        
    }
}