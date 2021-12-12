import Joi from 'joi';
import { Question } from '../interfaces/questionInterface';
import { ValidationRes } from '../interfaces/validationInterface';

const schema = Joi.object({
    question: Joi.string().required(),
    student: Joi.string().required(),
    class: Joi.string().required(),
    tags: Joi.string().required(),
});

function Validation(body: Question): ValidationRes {
    const validate = schema.validate(body);

    if (!validate.error) {
        return {
            isValid: true,
        };
    }

    return {
        isValid: false,
        error: validate.error.message,
    };
}

export default Validation;
