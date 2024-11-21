export interface Answer {
  text: string;
  isCorrect?: boolean;
  isChecked: boolean;
}

export interface Question {
  question: string;
  isCorrect?: boolean;
  isAnswered: boolean;
  answers: Answer[];
}