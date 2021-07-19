import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link, Redirect, Navbar, NavLink } from 'react-router-dom'
import { deleteAuthedUser } from '../actions/authedUser'


class Nav extends Component {
    logout = () => {
        this.props.dispatch(deleteAuthedUser())
    }
    render() {
        const { loggedInUser } = this.props
        if (this.props.authedUser === '') {
            return (
                <Redirect to="/" />
            )
        }

        return (
            <div>
                <nav className='nav'>
                    <ul>
                        <li><NavLink to='/' exact activeClassName='active'>Home</NavLink></li>
                        <li><NavLink to='/add' activeClassName='active'>New Question</NavLink></li>
                        <li><NavLink to='/leaderboard' activeClassName='active'>Leaderboard</NavLink></li>
                        <li><NavLink to='/' activeClassName='active' onClick={this.logout}>Logout</NavLink></li>
                    </ul>
                    <div className="navText">Hello, {loggedInUser.name}</div>
                </nav>
            </div>

        )
    }
}

function mapStateToProps({ authedUser, users }) {
    return {
        loggedInUser: users[authedUser],
        authedUser
    }
}

export default connect(mapStateToProps)(Nav)