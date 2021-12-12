interface Question {
    question: string;
    student: string;
    class: string;
    tags: string;
}

interface QuestionExtended extends Question {
    id: number;
}

interface Answer extends Question{
    answered: boolean;
    submittedAt: string;
    answeredAt?: string;
    answeredBy?: number;
    answer?: string;
}

export { Question, QuestionExtended, Answer };
