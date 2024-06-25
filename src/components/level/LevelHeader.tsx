const LevelHeader=({id}:{
    id:number
})=>{
    return(<>
    <div className="animate-slidein300 level_header w-full m-10 p-7 text-3xl">
        Level {id}
    </div>
    </>);
}
export default LevelHeader;