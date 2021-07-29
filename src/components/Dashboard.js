import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Container, Col, Nav } from 'react-bootstrap'
import Poll from './Poll'
import '../index.css'



export class Dashboard extends Component {
    static propTypes = {
        userQuestionData: PropTypes.object.isRequired
    }

    state = {
        answeredUnanswered: false
    }

    updateUnanswered = () => {
        this.setState({ answeredUnanswered: false })
    }
    updateAnswered = () => {
        this.setState({ answeredUnanswered: true })
    }
    render() {

        return (
            <div>

                <Container>
                    <Col xs={6} md={6}>
                        <Nav justify variant="tabs" defaultActiveKey="link-1">
                            <Nav.Item>
                                <Nav.Link eventKey="link-1" onClick={this.updateUnanswered}>Unanswered</Nav.Link>
                            </Nav.Item>
                            <Nav.Item>
                                <Nav.Link eventKey="link-2" onClick={this.updateAnswered}>Answered</Nav.Link>
                            </Nav.Item>
                        </Nav>
                        {this.state.answeredUnanswered === false ? (
                            this.props.userQuestionData.unanswered.map(question => (
                                <Poll key={question.id} quest={question} />
                            ))
                        ) : this.props.userQuestionData.answered.map((question) => (
                            <Poll key={question.id} quest={question} />
                        ))}


                    </Col>
                </Container>
            </div>
        )

    }
}



function mapStateToProps({ authedUser, users, questions }) {

    const answeredIds = Object.keys(users[authedUser].answers);
    const answered = Object.values(questions)
        .filter(question => answeredIds.includes(question.id))
        .sort((a, b) => b.timestamp - a.timestamp);
    const unanswered = Object.values(questions)
        .filter(question => !answeredIds.includes(question.id))
        .sort((a, b) => b.timestamp - a.timestamp);

    return {
        userQuestionData: {
            answered,
            unanswered
        }
    };
}

export default connect(mapStateToProps)(Dashboard);