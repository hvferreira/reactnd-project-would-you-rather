import { showLoading, hideLoading } from 'react-redux-loading'
import { saveQuestion, saveQuest } from '../utils/api'
import { addQuestionToUser, addAnswerToUser } from "./users";


export const RECEIVE_QUESTIONS = 'RECEIVE_QUESTIONS'
export const ANSWER_TO_QUESTION = 'ANSWER_TO_QUESTION'
export const QUESTION = 'QUESTION'

//DONE
function answerToQuestion(questions) {
    return {
        type: ANSWER_TO_QUESTION,
        questions,
    }
}

export function handleSaveQuestion(text, replyingTo) {
    return (dispatch, getState) => {
        const { authedUser } = getState()

        dispatch(showLoading())

        return saveQuestion({
            text,
            author: authedUser,
            replyingTo
        })
            .then((QUESTION) => dispatch(QUESTION))
            .then(() => dispatch(hideLoading()))
    }
}

//DONE
export function receiveQuestions(questions) {
    return {
        type: RECEIVE_QUESTIONS,
        questions,
    }
}