import React,{ Component } from 'react';
import { connect } from 'react-redux'
import LeaderboardContent from './LeaderboardContent';

class Leaderboard extends Component {
    
    render() {
        
        return(
            
            <LeaderboardContent users={this.props.rankedUsers} />
            
        )
    }

}

const mapStateToProps = ({ users }) => {
    let userArray = Object.keys(users).map( key => users[key])
    return {
        rankedUsers: userArray.sort(rankUsersByCombinedVotes)
    }
}

function rankUsersByCombinedVotes(userOne, userTwo) {

    let userOneRank = Object.keys(userOne.answers).length + userOne.questions.length
    let userTwoRank = Object.keys(userTwo.answers).length + userTwo.questions.length

    if (userOneRank < userTwoRank) {
        return 1
    } else if (userOneRank > userTwoRank) {
        return -1
    } else {
        return 0
    }

  }


export default connect(mapStateToProps)(Leaderboard);