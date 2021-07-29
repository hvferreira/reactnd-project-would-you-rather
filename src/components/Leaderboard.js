import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Container, Col, Card } from 'react-bootstrap'



class Leaderboard extends Component {
    render() {
        return (

            <div>

                <Container>
                    <Col xs={6} md={6}>
                        {this.props.sortedUsers.map((user) => (
                            <Card>
                                <Card.Img variant="top" src={user.avatarURL} />
                                <Card.Body>
                                    <Card.Title>{user.name}</Card.Title>
                                    <div className="cell">Answered Questions: {Object.keys(user.answers).length}</div>
                                    <div className="cell">Created Question: {user.questions.length}</div>
                                    <div className="cell">Score: {Object.keys(user.answers).length + user.questions.length}</div>
                                </Card.Body>
                            </Card>
                        ))}
                    </Col>
                </Container>
            </div>
        )
    }
}

function mapStateToProps({ users }) {
    const sortedUsers = (Object.values(users)).sort((a, b) => {
        const x1 = (Object.keys(a.answers)).length + a.questions.length
        const x2 = (Object.keys(b.answers)).length + b.questions.length
        return x2 - x1
    })
    return {
        sortedUsers
    }
}

export default connect(mapStateToProps)(Leaderboard)
