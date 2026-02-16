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
    console.log(queue,users);
    getMap();
  }, [])

  const getMap = async () => {
    const response = await getQueueUserMap();
    console.log(response.data)
    setQuMap(response.data);
  }

  const renderMembers=()=>{
    // console.log(queue?.id)

    const listOfMembers = QuMap.filter((item)=> item.queueid === queue.id );
    console.log(listOfMembers);
    const namesOfMembers:string[] = [];
    for(let i=0;i<listOfMembers.length;i++ ){
      const result = users.filter((item)=> item.id === listOfMembers[i].userid);
      if(result.length){
        namesOfMembers.push(result[0]?.name);
      }
    }
    if(namesOfMembers.length)
      return namesOfMembers.map((item)=>(<div>{item}</div>))
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