interface MemberProps {
  data: any
  deleteMember: (id:number) => void
}

const Members = ({data, deleteMember}:MemberProps) =>{

  const renderMembers = () => {
    return data.map((item:any) => (
    <div className="flex space-x-5 text-sm border-solid  border-b-orange-300 border-b" key={item.ID}>
      <span>{item?.name}</span> <button className="btn btn-block btn-xs w-1/6 h-7" onClick={()=>{deleteMember(item?.ID)}}>Delete</button>
    </div>))
  }

  return (
    <>
      {renderMembers()}
    </>
  )
}

export default Members