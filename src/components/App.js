import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import { 
  BrowserRouter as Router,
  Route,
} from 'react-router-dom'

import Dashboard from './Dashboard'
import NewQuestion from './NewQuestion'
import LeaderboardPage from './LeaderboardPage'
import QuestionPage from './QuestionPage'
import Login from './Login'
import Header from './Header'

import CssBaseline from '@material-ui/core/CssBaseline'
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';


const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#6a1b9a',
    },
    secondary: {
      main: '#00c853',
    },
  },
});

class App extends Component {

  componentDidMount() {
    this.props.dispatch(handleInitialData())
  } 


  render() {

    const { authedUser, users } = this.props

    if (authedUser.id === null) {
      
      return (
        <Fragment>
          <CssBaseline />
          <MuiThemeProvider theme={theme}>
            <Login users={users} />
          </MuiThemeProvider>
        </Fragment>
      )
    
    } else {
      
      return(
      
        <Router>
          <Fragment>
            <CssBaseline />
            <MuiThemeProvider theme={theme}>
              <Header />
              {
                <div>
                    <Route exact path='/' component={Dashboard} />
                    <Route path='/new' component={NewQuestion} />
                    <Route path='/leaderboard' component={LeaderboardPage} />
                    <Route path='/question/:id' component={QuestionPage} />  
                </div>
              }
            </MuiThemeProvider>
          </Fragment>
        </Router>
      
      )
    }

  }
}

function mapStateToProps ({authedUser, users}) {
  return {
    authedUser,
    users
  }
}


export default connect(mapStateToProps)(App)
