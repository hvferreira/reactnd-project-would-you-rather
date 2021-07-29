import {
    RECEIVE_QUESTIONS,
    ANSWER_TO_QUESTION,
    QUESTION
} from '../actions/questions'

export default function question(state = {}, action) {
    switch (action.type) {
        case RECEIVE_QUESTIONS:
            return {
                ...state,
                ...action.questions
            };
        case ANSWER_TO_QUESTION:
            const { authedUser, qid, answer } = action;
            return {
                ...state,
                [qid]: {
                    ...state[qid],
                    [answer]: {
                        ...state[qid][answer],
                        votes: state[qid][answer].votes.concat(authedUser)
                    }
                }
            }
        case QUESTION:
            return {
                ...state,
                [action.question.id]: action.question
            };
        default:
            return state;
    }
}

