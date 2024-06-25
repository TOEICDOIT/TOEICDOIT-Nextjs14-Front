'use client';

import { useInfiniteQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { useInView } from "react-intersection-observer";

export default function QuestionContainer(){
    const {data,error,status,fetchNextPage,isFetchingNextPage}=useInfiniteQuery({
        queryKey:['quesitons'],
        queryFn:fetchQuestions,
        initialPageParam:0,
        getNextPageParam:(lastPage)=>lastPage.nextPage,
    });

    const {ref,inView}=useInView();

    useEffect(()=>{
        if(inView){
            fetchNextPage();
        }
    },[fetchNextPage,inView]);

    return status==='pending'?(
        <div className="text-black">Loading...</div>
    ): status==='error'?
    ():();
}