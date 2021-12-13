interface Question {
    question: string;
    student: string;
    class: string;
    tags: string;
    submitAt?: string;
}

interface QuestionExtended extends Question {
    id: number;
}

interface Answer extends Question{
    answered: boolean;
    answeredAt?: string;
    answeredBy?: number;
    answer?: string;
}

export { Question, QuestionExtended, Answer };
