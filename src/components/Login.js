import React, { Component } from "react";
import { connect } from "react-redux";
import { setAuthedUser } from "../actions/authedUser";

class Login extends Component {
    state = {
        selectedUser: "none",
    };

    renderUsers() {
        const { users } = this.props;
        const userKeys = Object.keys(users);

        return userKeys.map((userKey) => {
            const user = users[userKey];
            return (
                <option value={user.id} key={user.id}>
                    {user.name}
                </option>
            );
        });
    }

    handleUserLogin = (event) => {
        event.preventDefault();
        const { selectedUser } = this.state;
        const { setAuthedUser } = this.props;
        if (selectedUser === "none") return;
        setAuthedUser(selectedUser)

    }

    handleChange = (event) => {
        this.setState({ selectedUser: event.target.value });
    };

    render() {
        return (
            <div className="login-page">
                <header>
                    Welcome to the <strong> Would You Rather?</strong>
                </header>

                <div className="select-user">
                    <h3>Who are You ? </h3>
                    <form onSubmit={this.handleUserLogin}>
                        <select
                            onChange={(event) => this.handleChange(event)}
                            defaultValue={this.state.selectedUser}
                        >
                            <option value="none" disabled>
                                {" "}
                                Choose User
                            </option>
                            {this.renderUsers()}
                        </select>
                        <br />
                        <button>Login</button>
                    </form>
                </div>
                <footer>Please Login</footer>
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    users: state.users,
});

const mapDispatchToProps = (dispatch) => ({
    setAuthedUser: (userID) => dispatch(setAuthedUser(userID)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);