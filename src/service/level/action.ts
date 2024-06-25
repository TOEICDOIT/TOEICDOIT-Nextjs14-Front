'use server';

import { CommonHeader } from "@/config/headers";
import { ITEMS_PER_PAGE, I_ApiLevelPracticeRequest, I_ApiLevelPracticeResponse, ToeicDataPublic } from "@/types/ToeicData";

export async function fetchQuestions({ 
    pageParam = 1, level
}:{
    pageParam:number,level:number
}) {

    console.log('page: ', pageParam);
    console.log('level: ', level);

    let questions: ToeicDataPublic[] = [];
    const offset = (pageParam - 1) * ITEMS_PER_PAGE;

    const payload: I_ApiLevelPracticeRequest = {
        currentPage: pageParam,
        level: level,
        offset: offset
    };

    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/toeic/level?page=${pageParam}`, {
            method: 'POST',
            headers: CommonHeader,
            body: JSON.stringify(payload),
            next: { revalidate: 60 }
        });

        if (!response.ok) {
            throw new Error('Failed to fetch question');
        }

        const data: I_ApiLevelPracticeResponse = await response.json();

        if (data && data.success) {
            questions = data.questions;
        } else {
            console.error('Failed to get response data', data.message);
        }

        const nextPage = data.questions.length === ITEMS_PER_PAGE ? pageParam + 1 : null;

        return {
            data: questions,
            currentPage: pageParam,
            nextPage: nextPage,
        };
        
    } catch (err) {
        console.log('Failed to get level: ', err);
        return {
            data: questions,
            currentPage: pageParam,
            nextPage: null,
        };
    }
}
