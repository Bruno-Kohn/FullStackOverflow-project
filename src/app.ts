import express from 'express';
import cors from 'cors';
import * as questionsController from './controllers/questionsController';

const app = express();
app.use(express.json());
app.use(cors());

app.post('/questions', questionsController.postQuestion);
app.get('/questions/:id', questionsController.getQuestionId);
app.post('/questions/:id', questionsController.answerAQuestion);
app.get('/questions', questionsController.getQuestions);
app.post('/users', questionsController.postUsers);

export default app;
