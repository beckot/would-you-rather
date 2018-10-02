import { saveQuestionAnswer } from '../utils/api'
import { saveQuestion } from '../utils/api'

export const RECEIVE_QUESTIONS = 'RECEIVE_QUESTIONS'
export const TOGGLE_QUESTION_ANSWER = 'TOGGLE_QUESTION_ANSWER'
export const ADD_QUESTION = 'ADD_QUESTION'
export const ADD_QUESTION_ERROR = 'ADD_QUESTION_ERROR'

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

export function handleSaveQuestionAnswer(info) {

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
      
        saveQuestion({
            optionOneText,
            optionTwoText,
            author: authedUser.id
        })
            .then((question) => dispatch(addQuestion(question)))
            .catch(err => dispatch({ type: ADD_QUESTION_ERROR, err }))
        
    }
}