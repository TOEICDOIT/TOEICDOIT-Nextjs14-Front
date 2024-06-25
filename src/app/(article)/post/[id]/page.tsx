import ArticleDetailContent from "@/components/article/ArticleDetailContent";
import ArticleDetailControl from "@/components/article/ArticleDetailControl";
import ArticleDetailProfile from "@/components/article/ArticleDetailProfile";
import ArticleDetailReply from "@/components/article/ArticleDetailReply";
import ArticleDetailTitle from "@/components/article/ArticleDetailTitle";
import ArticleWriteReply from "@/components/article/ArticleWriteReply";
import NoticeLink from "@/components/article/NoticeLink";
import PostLink from "@/components/article/PostLink";
import { CommonHeader } from "@/config/headers";
import { I_ApiArticleDetailRequest, ArticleDetail, I_ApiArticleDetailResponse } from "@/types/ArticleData";
import ChatIcon from '@mui/icons-material/Chat';


export const metadata = {
    title: "Toeicdoit - Post Page",
    description: "",
};
export default async function PostDetailPage({ params }: {
    params: {
        id: number;
    }
}) {

    const payload: I_ApiArticleDetailRequest = { id: params.id }
    let article: ArticleDetail = {
        id: 0,
        title: "",
        writer: "",
        content: "",
        create: new Date(),
        update: new Date(),
    };

    let totalIndex: number = 0;

    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/post/getDetail`, {
            method: 'POST',
            headers:CommonHeader,
            body: JSON.stringify(payload),
            next: { revalidate: 60 * 60 }
        })

        if (!response.ok) {
            throw new Error('Failed to fetch notice detail');
        }

        const data: I_ApiArticleDetailResponse = await response.json();

        if (data && data.success) {
            article = data.article;
            totalIndex = data.totalIndex;
        } else {
            console.error('Failed to get response data', data.message);
        }
    } catch (err) {
        console.log('Failed to get notice: ', err)
    }

    return (<>
        <div className="total_padding py-28">
            <div className="w-full flex flex-col z-10 px-[7%]">
                <PostLink label={""} />
                <div className="mt-10" />
                <ArticleDetailTitle
                    type={"post"}
                    categoryId={article?.category?.id || 1}
                    title={article?.title}
                    category={article?.category?.category || ''} />

                <div className="bg-zinc-300 w-full h-[0.5px] my-3" />
                <ArticleDetailProfile
                    writer={article.writer}
                    create={article.create}
                    update={article.update} />

                <div className="bg-zinc-300 w-full h-[0.5px] my-3" />
                <ArticleDetailContent content={article.content} />
                <ArticleDetailControl id={params.id} totalIndex={totalIndex} />

                <div className="mt-16" />
                <div className='flex flex-row items-center gap-x-3'>
                    <ChatIcon className='text-[#F9F07A] text-3xl' />
                    <p className="text-black text-2xl font-medium">댓글</p>
                </div>
                <div className="bg-zinc-300 w-full h-[0.5px] my-3" />
                <ArticleWriteReply/>
                <div className="bg-zinc-300 w-full h-[0.5px] my-3" />

                {article.reply?.map((reply)=>(
                    <>
                    <ArticleDetailReply writer={reply.writer || ''} content={article.content} create={article.create} id={reply.id} />
                    </>            
                ))}
                <ArticleDetailReply writer={"작성자"} content={article.content} create={article.create} id={1} />
            </div>
        </div>
    </>);
}