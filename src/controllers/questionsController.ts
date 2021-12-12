/* eslint-disable no-console */
import { Request, Response } from 'express';
import { ValidationRes } from '../interfaces/validationInterface';
import Validation from '../validations/validation';
import userValidation from '../validations/usersValidation';
import * as questionsService from '../services/questionsService';
import * as questionsRepository from '../repositories/questionsRepository';

async function postQuestion(req: Request, res: Response) {
    try {
        const valQuestion: ValidationRes = Validation(req.body);
        if (!valQuestion.isValid) {
            return res.status(400).send(valQuestion.error);
        }

        const id: number = await questionsService.postQuestion(req.body);
        return res.status(201).send({ id });
    } catch (error) {
        console.log(error);
        return res.sendStatus(500);
    }
}

async function getQuestionId(req: Request, res: Response) {
    try {
        const { id: idQuestion } = req.params;
        const result = await questionsService.getQuestionId(Number(idQuestion));
        return res.send(result);
    } catch (error) {
        console.log(error);
        if (error.type === 'NotFound') {
            return res.status(404).send(error.message);
        }
        return res.sendStatus(500);
    }
}

async function answerAQuestion(req: Request, res: Response) {
    try {
        const { id: idQuestion } = req.params;
        const { answer } = req.body;
        const { authorization } = req.headers;
        const token = authorization?.replace('Bearer ', '');

        if (!token) {
            return res.sendStatus(403);
        }

        if (!answer) {
            return res.status(400).send('You need to fill the "answer" option');
        }
        if (!Number(idQuestion)) return res.status(400).send('Param id needs to be a number');

        const tokenCheck = await questionsRepository.checkToken(token);
        if (!tokenCheck) return res.status(403).send('You need to register before answer a question');

        // eslint-disable-next-line max-len
        const result = await questionsService.answerAQuestion(Number(idQuestion), answer, tokenCheck.id);
        if (result === 'conflict') return res.send(409);
        if (result === 'not found') return res.send(404);
        return res.status(201).send({ answer: result });
    } catch (error) {
        console.log(error);
        return res.sendStatus(500);
    }
}

async function getQuestions(req: Request, res: Response) {
    try {
        const questions = await questionsService.getQuestions();
        return res.send(questions);
    } catch (error) {
        console.log(error);
        return res.sendStatus(500);
    }
}

async function postUsers(req: Request, res: Response) {
    try {
        const valUser: ValidationRes = userValidation(req.body);
        if (!valUser.isValid) {
            return res.status(400).send(valUser.error);
        }

        const token: string = await questionsService.postUsers(req.body);
        if (!token) return res.status(409).send('This username is not available');
        return res.send({ token });
    } catch (error) {
        console.log(error);
        return res.sendStatus(500);
    }
}

export {
    postQuestion, getQuestionId, answerAQuestion, getQuestions, postUsers,
};
