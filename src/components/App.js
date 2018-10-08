import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
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
import AuthedUserInfo from './AuthedUserInfo'


class App extends Component {

  render() {

    const { authedUser } = this.props

    if (authedUser.id === null) {
      
      return <Login />
    
    } else {
      
      return(
      
        <Router>
          <Fragment>
            <div className='container'>
              <Nav />
              <AuthedUserInfo />
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
    authedUser,
    loading: authedUser === null,
  }
}


export default connect(mapStateToProps)(App)
