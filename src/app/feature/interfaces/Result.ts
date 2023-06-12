import { Question } from "./Question";

export interface Result {
  id: number;
  score: number;
  percentage: number;
  questions: Question[];
}
