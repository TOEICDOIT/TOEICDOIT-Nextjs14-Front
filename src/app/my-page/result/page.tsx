import LineChart from "@/components/chart/LineChart";
import MyPageHeader from "@/components/my-page/MyPageHeader";
import { AuthorizeHeader } from "@/config/headers";
import { ERROR } from "@/constants/enums/ERROR";
import ResultContainer from "@/templates/my-page/ResultContainer";
import { cookies } from "next/headers";


export default async function ResultPage(){
    //let data:number[][];

    try{
        const userId=cookies().get('userId')?.value;
        const accessToken=cookies().get('accessToken')?.value;
        const response=await fetch(`${process.env.NEXT_PUBLIC_TOEIC_API_URL}/api/toeic/exam/user/score/${userId}`,{
            method:'GET',
            cache:'no-store',
            headers:AuthorizeHeader(accessToken)
        })


    }catch(err){
        throw new Error(ERROR.SERVER_ERROR);
    }
    
    const data1:number[]=[32, 42, 51, 60, 51, 95, 97];
    const data2:number[]=[37, 42, 41, 37, 31, 44, 42];
    const data3:number[]=[60, 54, 54, 28, 27, 49, 52];
    const data4:number[]=[37, 74, 41, 30, 35];
    const data=[data1,data2,data3,data4];
                    
    return (<>
        <div className="px-[5%] mt-10 lg:mt-20">

            <MyPageHeader label={"학업 성취도"}/>
            <div className="mt-2 lg:mt-5"/>
            <div className="bg-blue-50 shadow-md rounded-2xl border-slate-200 border-2 w-full p-2">
            <div className="w-full h-[400px] bg-white p-5 rounded-xl shadow-lg border-slate-200 border-2 flex items-center justify-center">
                <LineChart label={[]} data={data}  />
            </div>
            </div>
                
            
            <div className="mt-10"/>
            <MyPageHeader label={"문제 풀이 기록"}/>
            <div className="mt-2 lg:mt-5"/>
            <ResultContainer/>
        </div>


    </>);
}

