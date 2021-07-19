import {
    RECEIVE_USERS,
    ADD_QUESTION_TO_USER,
    ADD_ANSWER_TO_USER
} from "../actions/users";

export default function users(state = {}, action) {
    switch (action.type) {
        case RECEIVE_USERS:
            return {
                ...state,
                ...action.users
            };
        case ADD_QUESTION_TO_USER:
            const { author, id } = action;
            return {
                ...state,
                [author]: {
                    ...state[author],
                    question: state[author].question.concat(id)
                }
            };
        case ADD_ANSWER_TO_USER:
            const { authUser, questionId, answer } = action;

            return {
                ...state,
                [authUser]: {
                    ...state[authUser],
                    answer: {
                        ...state[authUser].answer,
                        [questionId]: answer
                    }
                }

            }
        default:
            return state;
    }
}