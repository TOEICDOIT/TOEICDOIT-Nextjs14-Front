'use server';

import { I_ApiLevelPracticeRequest, I_ApiLevelPracticeResponse, ToeicDataPublic } from "@/types/ToeicData";

export async function fetchQuestions(
    {page=1,level,limit=10}
    :
    {page?:number,level:number,limit?:number}
){

    let questions:ToeicDataPublic[]=[];

    const payload:I_ApiLevelPracticeRequest={
        currentPage:page,
        level:level
    }

    try{
        const response=await fetch(`${process.env.NEXT_PUBLIC_API_URL}`,{
            method:'POST',
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify(payload),
            cache:'no-store'
        });

        if(!response.ok){
            throw new Error('Failed to fetch question');
        }

        const data:I_ApiLevelPracticeResponse=await response.json();

        
        if(data && data.success){
            questions=data.questions;
        }else{
            console.error('Failed to get response data',data.message);
        }

        return {questions:questions};
    
    }catch(err){
        console.log('Failed to get level: ',err);
        return {err};
    }
}