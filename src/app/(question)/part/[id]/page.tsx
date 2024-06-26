import QuestionContainer from "@/templates/level/QuestionContainer";

export default async function LevelPracticePage({ params }: {
    params: {
        id: number;
        page?: string;
    }
}) {

    

    return (<>
        <QuestionContainer id={params.id}/>
    </>);
}