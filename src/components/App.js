import React, { Component } from 'react'
import { connect } from 'react-redux'
import { handleInitialData } from '../actions/shared'
// import Dashboard from './Dashboard'
// import NewQuestion from './NewQuestion'
import QuestionPage from './QuestionPage'


class App extends Component {

  componentDidMount() {
    this.props.dispatch(handleInitialData())
  }
  
  render() {
    return (
        <div>
          {
              this.props.loading === true
              ? 'Loading...'
              : <QuestionPage match={{params: {id: '6ni6ok3ym7mf1p33lnez' }}} />
          }
        </div>
    )
  }
}

function mapStateToProps ({authedUser}) {
  return {
    loading: authedUser === null
  }
}


export default connect(mapStateToProps)(App)
