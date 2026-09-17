export interface Question {
  id: string;
  text: string;
  answers: string[];
}

declare const QUESTIONS: Question[];

export default QUESTIONS;