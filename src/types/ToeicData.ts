export type ToeicData={
    id:number;
    quesiton:string;
    level:number;
    part:number;
    answer:string;
    description:string;
    image:string;
    sound:string;
    script:string;
    createdAt:Date;
    updatedAt:Date;
    title:string;
    take:boolean;
    option:OptionData;
    result:ResultData;
}
export type OptionData={
    id:number;
    choice1:string;
    choice2:string;
    choice3:string;
    choice4:string;
}
export type ResultData={
    id:number;
    result:boolean;
    userAnswer:string;
    isCorrect:boolean;
    createdAt:Date;
    updatedAt:Date;
}
export type AnswerData={
    id:number;
    question:number;
    answer:number;
}
export type ToeicDataPublic={
    id:ToeicData['id'],
    quesiton:ToeicData['quesiton'];
    part:ToeicData['part'];
    image:ToeicData['image'];
    sound:ToeicData['sound'];
    option:ToeicData['option'];

}
export const ITEMS_PER_PAGE = 10;
export const CURRENT_TOTAL_PAGE=10;

export interface I_ApiLevelPracticeRequest{
    currentPage?:number;
    level:number;
    offset?:number;
}
export interface I_ApiLevelPracticeResponse{
    questions:ToeicDataPublic[];
    success:boolean;
    message?:string;
}
