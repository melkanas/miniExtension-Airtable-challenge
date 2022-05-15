
export default function Classe({name,id}:{name:string,id:number}){
    return(
        <>
        <h3 key={id}>{name}</h3>
        </>
    )
}