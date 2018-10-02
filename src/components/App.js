import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import { handleInitialData } from '../actions/shared'
import { 
  BrowserRouter as Router,
  Route,
} from 'react-router-dom'
import Nav from './Nav'
import Dashboard from './Dashboard'
import NewQuestion from './NewQuestion'
import LeaderboardPage from './LeaderboardPage'
import QuestionPage from './QuestionPage'
import Login from './Login'


class App extends Component {

  componentDidMount() {
    this.props.dispatch(handleInitialData())
  }
 
  render() {

    const { authedUser } = this.props

    if (authedUser === null) {
      
      return <Login />
    
    } else {
      
      return(
      
        <Router>
          <Fragment>
            <div className='container'>
              <Nav />
              {
                  this.props.loading === true
                  ? 'Loading...'
                  : 
                    <div>
                        <Route exact path='/' component={Dashboard} />
                        <Route path='/new' component={NewQuestion} />
                        <Route path='/leaderboard' component={LeaderboardPage} />
                        <Route path='/question/:id' component={QuestionPage} />  
                    </div>
              }
            </div>
          </Fragment>
        </Router>
      
      )
    }

  }
}

function mapStateToProps ({authedUser}) {
  return {
    loading: authedUser === null,
    authedUser,
  }
}


export default connect(mapStateToProps)(App)
