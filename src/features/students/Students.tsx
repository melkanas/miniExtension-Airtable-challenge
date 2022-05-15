
export default function Student({students}:{students:[string]}){
  
    return(
        <>
        <h5>Students: </h5>
        <div>{students.toString()}</div>
        </>
    )
}
