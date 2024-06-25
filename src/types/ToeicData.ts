export type ToeicData={
    id:number;
    quesiton:string;
    level:number;
    part:number;
    title:string;
    take:boolean;
    answer:string;
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
}
export type AnswerData={
    id:number;
    question:number;
    answer:number;
}
export const ITEMS_PER_PAGE = 10;
export const CURRENT_TOTAL_PAGE=10;


