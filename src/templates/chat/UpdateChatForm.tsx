"use client";
import SubmitButton from "@/components/button/SubmitBtn";
import { chatCategory, chatCategoryType } from "@/constants/chat/constant";
import { ERROR } from "@/constants/enums/ERROR";
import { saveRoom, updateRoomById } from "@/service/chat/actions";
import { handleError } from "@/service/utils/error";
import { ChatRoomData } from "@/types/ChatData";
import { initialMessageState } from "@/types/MessengerData";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { useFormState, useFormStatus } from "react-dom";


export default function UpdateChatForm({setCreate,chat}:{
    chat:ChatRoomData
    setCreate: Dispatch<SetStateAction<boolean>>
}) {

    const [selected, setSelected] = useState<string[]>(chat.roomCategories.map(item=>item.toLocaleUpperCase()));

    const { pending } = useFormStatus();
    const updateRoomByIdWithCategory=updateRoomById.bind(null,selected);
    const [state, formAction] = useFormState(updateRoomByIdWithCategory, initialMessageState);
    

    const handleClick = (category: string) => {
        setSelected(prevCategories => {
            if (prevCategories.includes(category)) {
                return prevCategories.filter(item => item != category);
            } else {
                return [...prevCategories, category];
            }
        })
        console.log(selected);
    }

    useEffect(() => {
        console.log('state.message: '+state.message);
        handleError(state.message);
        if(state.message==='SUCCESS'){
            setCreate(false);
        }
    }, [state?.message]);

    return (<>
        <form
            action={formAction}
            className="mt-5"
        >
            <div className="w-full h-full">
                <label htmlFor="roomCategories"
                    className="form_label"
                >카테고리 선택하기</label>
                <input 
                name='roomId'
                value={chat.id}
                className="hidden"
                />
                <ul
                    className="flex flex-wrap gap-x-2 gap-y-3 mt-5">
                    {chatCategory.map((category, index) => {
                        return (
                            <button
                            type="button"
                            onClick={() => { handleClick(category.category) }}
                            key={category.id}
                            className={`text-black ${selected.includes(category.category) ? 'bg-slate-200': 'bg-white'} shadow-lg rounded-full py-3 px-4 hover:bg-slate-50`}
                        >
                            {category.title}
                        </button>
                        );
                    })}
                </ul>
            </div>

            <div className="mt-5">
                <label htmlFor="title"
                    className="form_label"
                >제목</label>
                <div className="mt-5" />
                <input type="text" name="title" id="title"
                    required
                    className="form_input"
                    placeholder="필수 항목입니다."
                    defaultValue={chat.title}
                />
            </div>

            <div className="mt-10" />
            <SubmitButton disabled={pending} label={"변경하기"} />
            <p aria-live="polite" className="sr-only" role="status">
                {state?.message}
            </p>
        </form>
    </>);
} 