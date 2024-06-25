"use client";
import ToeicPlayer from '@/components/audio/ToeicPlayer';
import LevelHeader from '@/components/level/LevelHeader';
import QuestionCard from '@/components/level/QuestionCard';
import { fetchItems } from '@/service/level/items';
import { useInfiniteQuery } from '@tanstack/react-query';
import dynamic from 'next/dynamic';
import { useEffect } from 'react';
import { useInView } from 'react-intersection-observer';

const LoadingPage = dynamic(() => import('@/app/loading'), { ssr: false });
const PaginationLoading = dynamic(() => import('@/components/utils/PaginationLoading'), { ssr: false });


export default function QuestionContainer({id}:{id:number}) {
    const { data, error, status, fetchNextPage, isFetchingNextPage } =
        useInfiniteQuery({
            queryKey: ['items'],
            queryFn: fetchItems,
            initialPageParam: 0,
            getNextPageParam: (lastPage) => lastPage.nextPage,
        });

    const { ref, inView } = useInView();

    useEffect(() => {
        if (inView) {
            fetchNextPage();
        }
    }, [fetchNextPage, inView]);

    return (<>
        {status === 'pending' ? (
            <LoadingPage />
        ) : status === 'error' ? (
            <div>{error.message}</div>
        ) : (
            <div className="flex flex-col w-full items-center justify-center">
        
        <LevelHeader id={id} />
        <ToeicPlayer />
        <div className="mt-10" />
        <div
                className="flex flex-col gap-2"
            >
                {data.pages.map((page) => {
                    return (
                        <div key={page.currentPage} className="flex flex-col gap-2">
                            {page.data.map((item) => {
                                return (
                                    <div 
                                    ref={ref}
                                    key={item.id} 
                                    className="rounded-md flex justify-center">
                                        <QuestionCard 
                                        id={item.id} question={"question is so hard. question is so hard. question is so hard. question is so hard. question is so hard. question is so hard. question is so hard. "}
                                            picture={""}
                                            option={{
                                                id: 0,
                                                choice1: "",
                                                choice2: "",
                                                choice3: "",
                                                choice4: ""
                                            }} />
                                    </div>
                                );
                            })}
                        </div>
                    );
                })}

                {isFetchingNextPage && <PaginationLoading />}
            </div>
        </div>
        )}
    </>);
}