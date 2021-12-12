import connection from '../database';
import User from '../interfaces/userInterface';

async function getUser(studentName: string): Promise<boolean> {
    const result = await connection.query('SELECT * FROM students WHERE name = $1', [studentName]);
    if (result.rowCount) return false;

    return true;
}

async function postUser(user: User): Promise<string> {
    const { name, class: userClass, token } = user;

    const result = await connection.query(
        `
        INSERT INTO students (name, class, token)
        VALUES ($1, $2, $3) RETURNING *
    `,
        [name, userClass, token],
    );

    return result.rows[0].token;
}

export { getUser, postUser };
