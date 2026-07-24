const Members = (data: any) => {

  const renderMembers = () => {
    return data.data.map((item:any) => (
    <div className="text-xs border-solid  border-b-orange-300 border-b" key={item.ID}>
      {item.name} 
    </div>))
  }

  return (
    <>
      {renderMembers()}
    </>
  )
}

export default Members