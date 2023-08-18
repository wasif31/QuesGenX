export interface Question {
  id: number;
  question: string;
  options: string[];
  answer: string;
  selectedAnswer?:string
  selectedOption?:number;
  isCorrect?:boolean;
}
