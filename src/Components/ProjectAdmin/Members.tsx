import { useEffect, useState } from "react"
import type { Queue, User, QueueUserMap } from "../../common/typesStore"
// import { getQueueUserMap } from "../../common/sharedFunctions";
import { SERVER, QUEUES_ENDPOINT } from "../../common/serverUrl";
import Http from "../../common/httpUtils"

export interface QueueMember {
  ID: number;
  name: string;
}

const Members = (queueid: any) => {
  const [QueueMembers, setQueueMembers] = useState<QueueMember[]>([]);

  useEffect(() => {
    console.log("useEffect", queueid);
    getMap();
  }, [])

  const getMap = async () => {
    const http = new Http;

    const URL = SERVER + QUEUES_ENDPOINT + "/" + queueid.queueid;
    const result = await http.get(URL);
    setQueueMembers(result.data);
  }

  const renderMembers = () => {
    return QueueMembers.map((item) => (<div className="text-xs border-solid  border-b-orange-300 border-b" key={item.ID}>{item.name}</div>))
  }

  return (
    <>
      <div>{renderMembers()}</div>
    </>
  )
}

export default Members