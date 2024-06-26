import Footer from "@/app/Footer";
import Navbar from "@/app/Navbar";
import ExplanationBtn from "@/components/toeic/ExplanationBtn";
import LinkIcon from "@/components/common/LinkIcon";
import ToeicGoBackBtn from "@/components/toeic/ToeicGoBackBtn";
import ScoreBtn from "@/components/toeic/ScoreBtn";
import { PG } from "@/constants/enums/PG";
import { SERVER } from "@/constants/enums/API";

export default async function ScorePage(){

    try{    
        const response=await fetch(`${process.env.NEXT_PUBLIC_API_URL}/${SERVER.TOEIC}`,{
            method:''
        })

    }catch(err){

    }

    return(<>
    <div>
    <Navbar />
        <div className="w-full flex flex-col place-items-center px-[10px] py-[5%] md:py-[17%] lg:py-[15%] xl:py-[13%] 2xl:py-[10%] total_padding">
        <div className="form w-full xl:w-[60%] lg:w-[80%] lg:p-[2%] p-[3%] mt-[2%] animate-slidein300">
            <div className="flex flex-row justify-center">
            <LinkIcon size={35}/>
            <div className="form_title">
                {}님의 점수는 {}입니다.
            </div>
            </div>
            
            
            <div className="flex flex-row justify-center gap-x-10">
                <ScoreBtn label={"오답 하러 가기"} url={`${PG.LEVEL}/${1}`} />
                <ScoreBtn label={"응시하기 전으로 돌아가기"} url={`${PG.LEVEL}`}/>
            </div>
        </div>
        </div>
        <Footer />
    </div>
    </>);
}