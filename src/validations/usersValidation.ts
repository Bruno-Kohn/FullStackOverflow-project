import Joi from 'joi';
import User from '../interfaces/userInterface';

const schema = Joi.object({
    name: Joi.string().required(),
    class: Joi.string().required(),
});

function userValidation(body: User) {
    const validation = schema.validate(body);
    if (!validation.error) {
        return {
            isValid: true,
        };
    }

    return {
        isValid: false,
        error: validation.error.message,
    };
}

export default userValidation;
