import connection from '../database';
import { Question, QuestionExtended, Answer } from '../interfaces/questionInterface';
import User from '../interfaces/userInterface';

async function postQuestion(question: Question): Promise<QuestionExtended> {
    const {
        question: questionText,
        student,
        class: classText,
        tags,
    } = question;

    const result = await connection.query(`
        INSERT INTO questions 
        (question, student, class, tags) 
        VALUES ($1, $2, $3, $4) 
        RETURNING *
    `, [questionText, student, classText, tags]);

    return result.rows[0];
}

async function getQuestionId(idQuestion: number): Promise<Answer> {
    let result = await connection.query(`
        SELECT questions.question, questions.student, questions.class, questions.tags, questions.answered,
        questions.submitted_at as "submitAt" FROM questions WHERE id = $1
    `, [idQuestion]);

    if (result.rowCount === 0) {
        return null;
    }

    if (result.rows[0].answered) {
        result = await connection.query(`
        SELECT questions.question, questions.student, questions.class, questions.tags,
        questions.answered, questions.submitted_at as "submitAt", 
        answers.answered_at as "answeredAt", students.name as "answeredBy", 
        answers.answer FROM questions 
        JOIN answers ON questions.id = answers.question_id 
        JOIN students ON answers.answered_by = students.id
        WHERE questions.id = $1`, [idQuestion]);
    }
    return result.rows[0];
}

async function answerAQuestion(answer: string, answeredBy: number, questionId: number)
    : Promise<Answer> {
    await connection.query(
        'UPDATE questions SET answered = true WHERE id = $1 RETURNING *;',
        [questionId],
    );

    const result = await connection.query(
        'INSERT INTO answers (answer, answered_by, question_id) VALUES ($1, $2, $3) RETURNING *;',
        [answer, answeredBy, questionId],
    );

    await connection.query(
        'UPDATE questions SET answer_id = $1 WHERE id = $2 RETURNING *;',
        [result.rows[0].id, questionId],
    );

    return result.rows[0];
}

async function getQuestions(): Promise<Question[]> {
    const result = await connection.query(`SELECT id, question, student, class, submitted_at as "submitAt" 
    FROM questions WHERE answered = false;`);

    return result.rows;
}

async function checkToken(token: string): Promise<User> {
    const result = await connection.query('SELECT * FROM students WHERE token = $1', [token]);

    return result.rows[0];
}

export {
    postQuestion, getQuestionId, answerAQuestion, getQuestions, checkToken,
};
