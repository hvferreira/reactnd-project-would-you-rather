import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
//import { Tab } from 'semantic-ui-react';
//import UserCard from './UserCard';
import Nav from './Nav'


export class Dashboard extends Component {
    static propTypes = {
        userQuestionData: PropTypes.object.isRequired
    };
    render() {

        const { userQuestionData } = this.props;
        console.log('HELLO', userQuestionData)
        //return <Tab panes={panes({ userQuestionData })} className="tab" />;
        return (
            <div>
                <h1>{userQuestionData.answered[0].id}</h1>


                {userQuestionData.unanswered.map(question => (
                    <UserCard
                        key={question.id}
                        question_id={question.id}
                        unanswered={false}
                    />
                ))}
            </div>

        )

    }
}



function mapStateToProps({ authedUser, users, questions }) {

    const answeredIds = Object.keys(users[authedUser].answers);
    const answered = Object.values(questions)
        .filter(question => !answeredIds.includes(question.id))
        .sort((a, b) => b.timestamp - a.timestamp);
    const unanswered = Object.values(questions)
        .filter(question => answeredIds.includes(question.id))
        .sort((a, b) => b.timestamp - a.timestamp);

    return {
        userQuestionData: {
            answered,
            unanswered
        }
    };
}

export default connect(mapStateToProps)(Dashboard);