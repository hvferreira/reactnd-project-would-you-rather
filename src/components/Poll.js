import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Card, Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'

class Poll extends Component {
    render() {
        return (
            <Card>
                <Card.Img variant="top" src={this.props.questionAuthor.avatarURL} />
                <Card.Body>
                    <Card.Title>{this.props.questionAuthor.name} asks</Card.Title>
                    <Card.Text>
                        Would you rather
                    </Card.Text>
                    <Link to={`/questions/${this.props.quest.id}`}><Button variant="primary" block onClick={this.routeChange}>View Poll</Button></Link>
                </Card.Body>
            </Card>
        )
    }
}

function mapStateToProps({ users }, { quest }) {

    return {
        questionAuthor: users[quest.author]
    }
}

export default connect(mapStateToProps)(Poll)