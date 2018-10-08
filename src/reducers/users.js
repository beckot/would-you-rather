import { RECEIVE_USERS } from "../actions/users";
import { ADD_QUESTION, TOGGLE_QUESTION_ANSWER } from '../actions/questions'

export default function users (state = {}, action ) {
    
    switch(action.type) {
        
        case RECEIVE_USERS :
            return {
                ...state,
                ...action.users
            }

        case TOGGLE_QUESTION_ANSWER : 
            
            const { authedUser, qid, answer } = action
        
            return {
                ...state,
                [authedUser]: {
                    ...state[authedUser],
                    answers: {
                        ...state[authedUser].answers,
                        [qid]: answer 
                    }
                }
            }
        
        case ADD_QUESTION : 

            const { question } = action
            const author = question.author

            return {
                ...state,
                [author]: {
                    ...state[author],
                    questions: state[author].questions.concat([question.id])
                }
            }
            

        default:
            return state
    }
}