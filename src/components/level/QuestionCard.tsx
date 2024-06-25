import { OptionData } from "@/types/ToeicData";
import Image from "next/image";

const QuestionCard = ({
    question, id, picture, option
}: {
    question: string;
    id: number;
    picture: string;
    option: OptionData;
}) => {
    return (<>
        <div className="flex flex-col justify-center m-7 2xl:my-7 2xl:w-[650px]">
            <div className="flex flex-row gap-x-2 mb-5 mx-40 2xl:mx-0">
                <h1
                    key="level practice number"
                    className="text-black text-2xl text-nowrap"
                >{id} . </h1>
                {question !== '' && <h2
                    key="level practice question"
                    className="text-black text-2xl items-start md:w-[600px]">
                    {question}
                </h2>}
            </div>
            <div
                key="level practice image"
                className="ml-10 mt-3">
                {picture !== '' &&
                    <div className="mx-40 2xl:mx-0 mb-10 object-cover w-[550px]">
                    <Image
                        src={`${picture}`}
                        alt={"level practice image"}
                        width={550}
                        height={600}
                        priority={true}
                        className=""
                    />
                    </div>
                }
            </div>
            
            <div className="ml-40 2xl:ml-0">   
                <div className="flex flex-wrap items-start mb-4">
                    <input id="a" type="radio" value="a" name={id.toString()}
                        className="w-6 h-6 mt-1 text-blue-600 bg-gray-100 border-gray-300" />

                    <label htmlFor="a" className="ms-2 text-xl font-medium text-gray-900 w-[600px] flex flex-row justify-start limited-width-text">
                       <p className="text-nowrap mr-2">(a)</p> 
                       {option.choice1}
                    </label>
                </div>

                <div className="flex items-start mb-4">
                    <input id="b" type="radio" value="b" name={id.toString()}
                        className="w-6 h-6 mt-1 text-blue-600 bg-gray-100 border-gray-300 " />
                     <label htmlFor="b" className="ms-2 text-xl font-medium text-gray-900 w-[710px] flex flex-row justify-start limited-width-text">
                       <p className="text-nowrap mr-2">(b)</p> 
                       {option.choice2}
                    </label>
                </div>

                <div className="flex items-start mb-4">
                    <input id="c" type="radio" value="c" name={id.toString()}
                        className="w-6 h-6 mt-1 text-blue-600 bg-gray-100 border-gray-300 " />
                    <label htmlFor="c" className="ms-2 text-xl font-medium text-gray-900 w-[710px] flex flex-row justify-start limited-width-text">
                       <p className="text-nowrap mr-2">(c)</p> 
                       {option.choice3}
                    </label>
                </div>
                <div className="flex items-start mb-4">
                    <input id="d" type="radio" value="d" name={id.toString()}
                        className="w-6 h-6 mt-1 text-blue-600 bg-gray-100 border-gray-300 " />
                     <label htmlFor="d" className="ms-2 text-xl font-medium text-gray-900 w-[710px] flex flex-row justify-start limited-width-text">
                       <p className="text-nowrap mr-2">(d)</p> 
                       {option.choice4}
                    </label>
                </div>
            </div>

        </div>
    </>);
}
export default QuestionCard;