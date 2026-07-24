interface MemberProps {
  data: any
  deleteMember: (id:number) => void
}

const Members = ({data, deleteMember}:MemberProps) =>{

  const renderMembers = () => {
    return data.map((item:any) => (
    <div className="text-xs border-solid  border-b-orange-300 border-b" key={item.ID}>
      {item?.name} <button onClick={()=>{deleteMember(item?.ID)}}>[DEL]</button>
    </div>))
  }

  return (
    <>
      {renderMembers()}
    </>
  )
}

export default Members