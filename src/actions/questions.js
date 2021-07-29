
import { saveQuestion, saveQuestionAnswer } from '../utils/api'
import { addQuestionToUser, addAnswerToUser } from "./users";


export const RECEIVE_QUESTIONS = 'RECEIVE_QUESTIONS'
export const ANSWER_TO_QUESTION = 'ANSWER_TO_QUESTION'
export const QUESTION = 'QUESTION'

//DONE
function answerToQuestion(authedUser, qid, answer) {
    return {
        type: ANSWER_TO_QUESTION,
        authedUser,
        qid,
        answer
    }
}



export function handleSaveQuestion(author, optionOneText, optionTwoText) {
    const question = {
        author: author,
        optionOneText: optionOneText,
        optionTwoText: optionTwoText
    }

    return (dispatch) => {
        return saveQuestion(question).then((q) => {

            dispatch(saveQuestions(q))
            dispatch(addQuestionToUser(q))
        })
    }
}

//DONE
export function receiveQuestions(questions) {
    return {
        type: RECEIVE_QUESTIONS,
        questions,
    }
}

export function saveQuestions(question) {

    return {
        type: QUESTION,
        question
    }
}

export function handleSaveAnswer(authedUser, qid, answer) {
    return dispatch => {
        dispatch(answerToQuestion(authedUser, qid, answer));
        dispatch(addAnswerToUser(authedUser, qid, answer));
        return saveQuestionAnswer({
            authedUser: authedUser,
            qid: qid,
            answer: answer
        })
    }
}