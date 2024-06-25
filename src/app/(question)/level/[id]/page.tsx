import LoadingPage from "@/app/loading";
import ToeicPlayer from "@/components/audio/ToeicPlayer";
import LevelHeader from "@/components/level/LevelHeader";
import QuestionCard from "@/components/level/QuestionCard";
import { fetchQuestions } from "@/service/level/action";
import QuestionContainer from "@/templates/level/QuestionContainer";
import { Suspense } from "react";

// const LoadingPage = dynamic(() => import('@/app/loading'), { ssr: false });
// const PaginationLoading = dynamic(() => import('@/components/utils/PaginationLoading'), { ssr: false });

export default async function LevelPracticePage({ params }: {
    params: {
        id: number;
        page?: string;
    }
}) {

    const level = params.id
    const page = typeof params.page === 'string' ? Number(params.page) : 1;
    const limit: number = 10;

    const promise = await fetchQuestions({ level });

    // try{
    //     const audio=fetch('/api/level/audio');
    // }catch(err){
    //     console.log(err);
    // }


    return (<>
        <QuestionContainer id={params.id}/>
    </>);
}