import { useEffect, useState } from "react"
import type { Queue, User, QueueUserMap } from "../../common/typesStore"
import { getQueueUserMap } from "../../common/sharedFunctions";

interface MemberProps {
  queue: Queue;
  users: User[];
}

const Members = ({queue, users}:MemberProps) => {
  const [QuMap, setQuMap] = useState<QueueUserMap[]>([]);

  useEffect(() => {
    console.log("useEffect");
    getMap();
  }, [])

  const getMap = async () => {
    const response = await getQueueUserMap();
    setQuMap(response.data);
  }

  const renderMembers=()=>{
    const listOfMembers = QuMap.filter((item)=> item.queueid === queue.id );
    const namesOfMembers:string[] = [];
    for(let i=0;i<listOfMembers.length;i++ ){
      const result = users.filter((item)=> item.id === listOfMembers[i].userid);
      if(result.length){
        namesOfMembers.push(result[0]?.name);
      }
    }
    if(namesOfMembers.length)
      return namesOfMembers.map((item)=>(<div className="text-xs border-solid  border-b-orange-300 border-b" key={item}>{item}</div>))
    else
      return "";
  }


  return (
    <>
    <div>{renderMembers()}</div>
    </>
  )
}

export default Members