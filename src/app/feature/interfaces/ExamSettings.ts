import {ContentType, DifficultyType, ExamType, QuestionType} from "../types/types";

export interface ExamSettings{
    selectedExamType?:ExamType;
    selectedDifficulty?:DifficultyType;
    selectedQuestionType?:QuestionType;
    selectedInputType?:ContentType;
    selectedQuestionNumber?:number;
    selectedLanguage?:string;
}
