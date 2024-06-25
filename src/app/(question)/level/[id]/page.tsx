import ToeicPlayer from "@/components/audio/ToeicPlayer";
import LevelHeader from "@/components/level/LevelHeader";
import QuestionCard from "@/components/level/QuestionCard";
import {useInfiniteQuery} from "@tanstack/react-query";

export const metadata = {
    title: "Toeicdoit - Level Practice Page",
    description: "",
};

export default function LevelPracticePage({
    params
}: {
    params: { id: number }
}) {
    // try{
    //     const audio=fetch('/api/level/audio');
    // }catch(err){
    //     console.log(err);
    // }


    return (<>
        <div className="flex flex-col w-full items-center justify-center">
            <LevelHeader id={params.id} />
            <ToeicPlayer />
            <div className="mt-10" />
            <div className="flex flex-wrap justify-between">
                <div className="flex justify-center">

                    <QuestionCard id={1} question={" question is so hard. question is so hard. question is so hard. question is so hard. question is so hard. question is so hard. question is so hard. "} picture={"/images/dashboard/planet-01.png"} option={{
                        id: 0,
                        choice1: "",
                        choice2: "",
                        choice3: "",
                        choice4: ""
                    }} />
                </div>

            </div>
        </div>
    </>);
}