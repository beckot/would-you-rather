import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const UNANSWERED_QUESTION_FILTER = 'unanswered'
const ANSWERED_QUESTION_FILTER = 'answered'

const QuestionList = (props) => {
    
    const { questions, questionFilter, userAnsweredQuestionIds } = props

    const sortedAndFilterQuestions = ((questions, questionFilter, userAnsweredQuestionIds) => {
    
        switch (questionFilter) {
    
          case UNANSWERED_QUESTION_FILTER :
        
            return (
              Object.keys(questions)
                .filter(key => !userAnsweredQuestionIds.includes(key))
                .sort((a,b) => questions[b].timestamp - questions[a].timestamp)  
                .map(id => questions[id])
            )
          
          case ANSWERED_QUESTION_FILTER :
        
            return (
              userAnsweredQuestionIds
                .sort((a,b) => questions[b].timestamp - questions[a].timestamp)  
                .map(id => questions[id])
            )
          
          default : 
              return questions
    
        }
       
    })(questions, questionFilter, userAnsweredQuestionIds)

    return (
        <div className='question-list'>
            <ul>
            {
                sortedAndFilterQuestions.map((question) => {
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
    );
    
}

QuestionList.propTypes = {
    questions: PropTypes.object,
    questionFilter: PropTypes.string,
    userAnsweredQuestionIds: PropTypes.array,
};

export default QuestionList;
