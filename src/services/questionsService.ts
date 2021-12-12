import { v4 as uuid } from 'uuid';
import * as questionsRepository from '../repositories/questionsRepository';
import * as usersRepository from '../repositories/usersRepository';
import { Question, Answer } from '../interfaces/questionInterface';
import User from '../interfaces/userInterface';

async function postQuestion(question: Question): Promise<number> {
    const result = await questionsRepository.postQuestion(question);
    return result.id;
}

async function getQuestionId(idQuestion: number): Promise<Answer> {
    const result = await questionsRepository.getQuestionId(idQuestion);

    if (result === null) {
        return null;
    }

    return result;
}

async function answerAQuestion(idQuestion: number, answer: string, userId: number)
    : Promise<string> {
    const question = await questionsRepository.getQuestionId(idQuestion);

    if (question === null) return 'not found';
    if (question.answered) return 'conflict';

    const answeredQuestion = await questionsRepository.answerAQuestion(answer, userId, idQuestion);
    return answeredQuestion.answer;
}

async function getQuestions(): Promise<Question[]> {
    const questions = await questionsRepository.getQuestions();

    return questions;
}

async function postUsers(user: User): Promise<string> {
    const resultUser = await usersRepository.getUser(user.name);

    if (!resultUser) return null;

    const token = uuid();
    const userToken = { ...user, token };

    const respondedToken = await usersRepository.postUser(userToken);
    return respondedToken;
}

export {
    postQuestion, getQuestionId, answerAQuestion, getQuestions, postUsers,
};
