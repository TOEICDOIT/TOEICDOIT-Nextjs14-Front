"use client";
import ToeicPlayer from '@/components/audio/ToeicPlayer';
import SubmitButton from '@/components/button/SubmitBtn';
import LevelHeader from '@/components/level/LevelHeader';
import QuestionCard from '@/components/level/QuestionCard';
import { initialState } from '@/components/user/init/user.state.init';
import { fetchQuestions, submitLevelTest } from '@/service/level/action';
import { fetchItems } from '@/service/level/items';
import { useInfiniteQuery } from '@tanstack/react-query';
import dynamic from 'next/dynamic';
import { useEffect, useState } from 'react';
import { useFormState } from 'react-dom';
import { useInView } from 'react-intersection-observer';

const LoadingPage = dynamic(() => import('@/app/loading'), { ssr: false });
const PaginationLoading = dynamic(() => import('@/components/utils/PaginationLoading'), { ssr: false });

export default function QuestionContainer({ id }: { id: number }) {

    const [state,formAction]=useFormState(submitLevelTest,initialState);

    const [selections, setSelections] = useState<{ [key: number]: string }>({});

    const { data, error, status, fetchNextPage, isFetchingNextPage } =
        useInfiniteQuery({
            queryKey: ['items'],
            queryFn: fetchItems,
            initialPageParam: 1,
            getNextPageParam: (lastPage) => lastPage.nextPage,
        });
    // const { data, error, status, fetchNextPage, isFetchingNextPage } =
    //     useInfiniteQuery({
    //         queryKey: ['questions', id],
    //         queryFn: ({ pageParam = 1 }) => fetchQuestions({ pageParam, level: id }),
    //         initialPageParam: 1,
    //         getNextPageParam: (lastPage) => lastPage.nextPage,
    //     });

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
            <div className="flex flex-col w-full items-center justify-center mb-10">

                <LevelHeader id={id} />
                <ToeicPlayer sound={'data.pages.find()?.data.find()?.sound'} />
                <div className="mt-10" />
                <form
                    action={formAction}
                    className="flex flex-col gap-2"
                >
                    {data.pages.map((page) => {
                        return (

                            <>
                                <div
                                    role="level practice"
                                    key={page.currentPage}
                                    className="flex flex-col gap-2">
                                    {page.data.map((item) => {
                                        return (
                                            <div
                                                key={item.id}
                                                ref={ref}
                                                className="rounded-md flex justify-center ">
                                                <QuestionCard
                                                    key={item.id}
                                                    id={item.id}
                                                    question={"item.quesiton"}
                                                    picture={""}
                                                    option={{
                                                        id: 1,
                                                        choice1: "item.option.choice1",
                                                        choice2: "item.option.choice2",
                                                        choice3: "item.option.choice3",
                                                        choice4: "item.option.choice4"
                                                    }} 
                                                    onSelect={function (id: number, answer: string): void {
                                                        throw new Error('Function not implemented.');
                                                    } } />
                                                {/* <QuestionCard
                                                    key={item.id}
                                                    id={item.id}
                                                    question={item.quesiton}
                                                    picture={item.image}
                                                    option={{
                                                        id: item.option.id,
                                                        choice1: item.option.choice1,
                                                        choice2: item.option.choice2,
                                                        choice3: item.option.choice3,
                                                        choice4: item.option.choice4
                                                    }} 
                                                    onSelect={function (id: number, answer: string): void {
                                                        throw new Error('Function not implemented.');
                                                    } } /> */}
                                            </div>
                                        );
                                    })}
                                </div>
                            </>

                        );

                    })}

                    {isFetchingNextPage && <PaginationLoading />}
                </form>
                <div className='w-[600px] mt-10'>
                    <SubmitButton label={'제출하기'} />
                </div>
            </div>
        )}
    </>);
}