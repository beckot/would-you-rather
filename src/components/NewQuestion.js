import React, { Component } from 'react'
import { connect } from 'react-redux'
import { handleAddQuestion } from '../actions/questions'

export class NewQuestion extends Component {

    state = {
        optionOne: '',
        optionTwo: ''
    }

    handleChange = (event) => {
       
        const { value, name } = event.target
       
        this.setState((prevState) => ({
            
            ...prevState,
            [name]: value
       
        }))
    
    }

    handleSubmit = (event) => {
        
        event.preventDefault()
        
        const { optionOne, optionTwo } = this.state

        handleAddQuestion(optionOne, optionTwo)

        console.log(`New question with options. optionOne: ${optionOne}, optionTwo: ${optionTwo}.`)

        this.setState( () => ({
            optionOne: '',
            optionTwo: ''
        }))

    }


    render() {

        const { optionOne, optionTwo } = this.state

        return (
            <div>
                <h3 className='center'>New Question</h3>
                <h4 className='center'>Would you rather...</h4>
                <form className='new-question' onSubmit={this.handleSubmit}>
                    <input
                        name='optionOne'
                        type='text'
                        value={optionOne}
                        placeholder='Option #1'
                        maxLength='80'
                        onChange={this.handleChange} />
                    <p className='center'>or</p>
                    <input
                        name='optionTwo'
                        type='text'
                        value={optionTwo}
                        placeholder='Option #2'
                        maxLength='80'
                        onChange={this.handleChange} />
                    <p className='center'></p>
                    <br />
                    <button 
                        className='btn'
                        type='submit'
                        disabled={optionOne === '' || optionTwo === ''}
                        value='Submit'>
                            Submit
                    </button>
                </form>
            </div>
        )
    }
}

export default connect()(NewQuestion)
