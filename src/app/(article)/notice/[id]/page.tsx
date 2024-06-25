import ArticleDetailContent from "@/components/article/ArticleDetailContent";
import ArticleDetailControl from "@/components/article/ArticleDetailControl";
import ArticleDetailProfile from "@/components/article/ArticleDetailProfile";
import ArticleDetailTitle from "@/components/article/ArticleDetailTitle";
import NoticeLink from "@/components/article/NoticeLink";
import { CommonHeader } from "@/config/headers";
import { I_ApiArticleDetailRequest, ArticleDetail, I_ApiArticleDetailResponse } from "@/types/ArticleData";

export const metadata = {
    title: "Toeicdoit - article Page",
    description: "",
};

export default async function ArticleDetailPage({ params }: {
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
                <NoticeLink />
                <div className="mt-10" />
                <ArticleDetailTitle
                    type={"notice"}
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
                <ArticleDetailControl id={params.id} totalIndex={totalIndex}/>
            </div>
        </div>
    </>);
}