export type ArticleData={
    id:number;
    title:string;
    content:string;
    writer:string;
    create:Date;
    update:Date;
    reply:ReplyData[];
    category?:Category;
}
export type Category={
    id:number;
    category:string;
}
export type ReplyData={
    id:number;
    content:string;
    writer:string;
}
export type ArticleDataPublic={
    id:ArticleData['id'];
    title:ArticleData['title'];
    writer:ArticleData['writer'];
    create:ArticleData['create'];
    update:ArticleData['update'];
    category?:ArticleData['category'];
}
export type ArticleDetail={
    id:ArticleData['id'];
    title:ArticleData['title'];
    writer:ArticleData['writer'];
    content:ArticleData['content'];
    create:ArticleData['create'];
    update:ArticleData['update'];
    category?:ArticleData['category'];
    reply?:ArticleData['reply'];
}
export interface I_ApiArticleRequest{
    query:string;
    currentPage:number;
    offset:number;
}
export interface I_ApiArticleResponse{
    totalPages:number;
    articles:ArticleDataPublic[];
    success:boolean;
    message?:string;
}
export interface I_ApiArticleDetailRequest{
    id:number;
}
export interface I_ApiArticleDetailResponse{
    totalIndex: number;
    article:ArticleDetail;
    success:boolean;
    message?:string;
}
