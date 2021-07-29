import React, { Component, Fragment } from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { connect } from 'react-redux'
import { handleInitialData } from '../actions/shared'
import Dashboard from './Dashboard'
import Nav from './Nav'
import Login from './Login';
import QuestionRespView from './QuestionRespView'
import NewQuestion from './NewQuestion'
import Leaderboard from './Leaderboard'

class App extends Component {
  componentDidMount() {
    const { handleInitialData } = this.props;
    handleInitialData();
  }

  render() {
    const { authedUser } = this.props;
    return (
      <Router>
        <div className="App">
          {authedUser === null ? (
            <Route render={() => (<Login />)} />
          ) : (
            <Fragment>
              <Nav />
              {/* {console.log('0', this.props.authedUser)} */}
              <Switch>
                <Route exact path="/" component={Dashboard} />
                <Route exact path="/add" component={NewQuestion} />
                <Route exact path="/questions/:question_id" component={QuestionRespView} />
                <Route exact path="/leaderboard" component={Leaderboard} />

              </Switch>

            </Fragment>
          )}

        </div>
      </Router>
    );
  }
}

function mapStateToProps({ authedUser }) {

  return {
    authedUser,
  }
}

export default connect(mapStateToProps, { handleInitialData })(App)
